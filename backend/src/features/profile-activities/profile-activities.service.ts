import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileActivityDto } from './dto/create-profile-activity.dto';
import { UpdateProfileActivityDto } from './dto/update-profile-activity.dto';
import {
  ActivityStatus,
  ProfileActivity,
} from 'src/schemas/profile-activity.schema';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryOptionsDto } from 'src/dto/query-options.dto';
import { DateTime } from 'luxon';
import { ProfilesService } from '../profiles/profiles.service';
import { DataService } from '../data/data.service';
import { Mission } from 'src/models/mission.model';
import { ListActivityQuery } from './dto/list-activity-query';
import { Data } from 'src/schemas';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
@Injectable()
export class ProfileActivitiesService {
  constructor(
    private profilesService: ProfilesService,
    @InjectModel(COLLECTION_NAME.PROFILE_ACTIVITIES)
    private model: Model<ProfileActivity>,
    private dataService: DataService,
    private httpService: HttpService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}
  async create(dto: CreateProfileActivityDto) {
    const { date, status, profileId, missionId } = dto;
    const activity = new this.model(dto);
    if (!date) {
      activity.date = DateTime.now().setZone('UTC+7').toISODate();
    }
    if (!status) {
      activity.status = ActivityStatus.TODO;
    }
    const profile = await this.profilesService.findOne(profileId);
    if (!profile) {
      throw new BadRequestException(`profile ${profileId} does not existed`);
    }
    const mission = await this.dataService
      .getModel()
      .findById<Data<Mission>>(dto.missionId);
    if (!mission) {
      throw new BadRequestException(`mission ${missionId} does not existed`);
    }
    activity.profile = profile;
    activity.mission = mission.data;
    activity.coinValue = mission.data.coinValue;
    activity.character = profile.character;
    return activity.save();
  }

  getModel() {
    return this.model;
  }

  findAll(options?: QueryOptionsDto, query?: ListActivityQuery) {
    let find = this.model.find();
    if (query.date) {
      find = find.where({ date: DateTime.fromISO(query.date).toISODate() });
    }
    if (query.status) {
      find = find.where({ status: query.status.split(',') });
    }
    find.limit(options?.limit || 5);
    find.skip(options?.skip);
    find.sort({ createdAt: 'desc' });
    return find.exec();
  }

  async findOne(id: string) {
    const activity = await this.model.findById(id);
    if (!activity) {
      throw new NotFoundException('ProfileActivity does not existed');
    }
    return activity;
  }

  ListbyPId(pid: string, query?: any) {
    return this.model.find({
      profile: pid,
      ...query,
    });
  }

  getStats() {
    return this.model.aggregate([
      {
        $group: {
          _id: '$profile',
          total: { $sum: '$status' },
        },
      },
    ]);
  }

  async getProfileStats(profileId: string) {
    const query = this.model.find({ profile: profileId });
    const success = await query
      .clone()
      .where({ status: ActivityStatus.SUCCESS });
    return {
      total: await query.clone().countDocuments(),
      success: success.length,
      coin: success.reduce((prev: any, curr) => prev + curr.coinValue, 0),
    };
  }

  update(id: string, updateProfileActivityDto: UpdateProfileActivityDto) {
    return this.model
      .findByIdAndUpdate(id, updateProfileActivityDto)
      .then(() => this.findOne(id))
      .then(async (data) => {
        if (data.status === 'PENDING') {
          await this.hookUpdatePayload(data).then((payload) =>
            firstValueFrom(
              this.httpService.post(
                this.configService.get('DISCORD_HOOK'),
                payload,
              ),
            ),
          );
        }
        if (data.status === 'SUCCESS' || data.status === 'FAILED') {
          await this.profilesService
            .findOne(data.profile.toString())
            .then(async (profile) => {
              const to = profile.email;
              const template =
                data.status === 'SUCCESS' ? 'approve' : 'disapprove';
              const stats = await this.getProfileStats(profile._id.toString());
              const context = {
                name: profile.displayName,
                imgUrl: data.photoUrl,
                coin: stats.coin,
              };
              console.log('Send Email');
              await this.mailService.sendProveTemplate(to, template, context);
              return data;
            });
        }
        return data;
      });
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  getToday(profileId?: string) {
    const today = DateTime.now().setZone('UTC+7');
    let query = this.model.find({
      status: {
        $in: ['DOING', 'PENDING', 'SUCCESS', 'FAILED'],
      },
      date: today.toISODate(),
    });
    if (profileId) {
      query = query.where({ profile: profileId });
    }
    return query;
  }

  private hookUpdatePayload(data: ProfileActivity) {
    const url = `${this.configService.get('FRONTEND_URL')}/admin/console/panel/${data!._id}`;
    return this.profilesService
      .findOne(data.profile.toString())
      .then(async (profile) => ({
        content: null,
        embeds: [
          {
            title: data.mission.name,
            description: data.mission.description,
            url,
            color: 16776960,
            fields: [
              {
                name: 'STATUS',
                value: data.status,
                inline: true,
              },
              {
                name: 'PENDING',
                value: await this.model
                  .find({ status: 'PENDING' })
                  .countDocuments(),
                inline: true,
              },
            ],
            author: {
              name: profile.displayName,
              icon_url: profile.photoUrl,
            },
            footer: {
              text: this.configService.get('ENV') || 'Local',
            },
            timestamp: DateTime.now(),
            image: {
              url: data.photoUrl,
            },
            thumbnail: {
              url: data.mission.photoUrl,
            },
          },
        ],
      }));
  }
}
