import { query } from 'express';
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
import { Data, Profile } from 'src/schemas';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, from, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ProfileActivitiesService {
  constructor(
    private profilesService: ProfilesService,
    @InjectModel(COLLECTION_NAME.PROFILE_ACTIVITIES)
    private model: Model<ProfileActivity>,
    private dataService: DataService,
    private httpService: HttpService,
    private configService: ConfigService,
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
    const find = this.model.find(query);
    find.limit(options?.limit || 5);
    find.skip(options?.skip);
    find.sort({ createdAt: 'asc' });
    return find.exec();
  }

  async findOne(id: string) {
    const activity = await this.model.findById(id);
    if (!activity) {
      throw new NotFoundException('ProfileActivity does not existed');
    }
  }

  ListbyPId(pid: string, query?: any) {
    return this.model.find({
      profile: pid,
      ...query,
    });
  }

  update(id: string, updateProfileActivityDto: UpdateProfileActivityDto) {
    return from(
      this.model.findByIdAndUpdate(id, updateProfileActivityDto),
    ).pipe(
      tap(async (data) => {
        return this.hookUpdatePayload(data).then((payload) =>
          firstValueFrom(
            this.httpService.post(
              this.configService.get('DISCORD_HOOK'),
              payload,
            ),
          ),
        );
      }),
    );
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  getToday(profileId?: string) {
    const today = DateTime.now();
    let query = this.model.find({
      status: {
        $in: ['DOING', 'PENDING', 'SUCCESS', 'FAILED'],
      },
      date: today.toISODate(),
    });
    if (profileId) {
      query = query.where({ profile: profileId })
    }
    return query;
  }

  private hookUpdatePayload(data: ProfileActivity) {
    return this.profilesService
      .findOne(data.profile.toString())
      .then(async (profile) => ({
        content: null,
        embeds: [
          {
            title: data.mission.name,
            description: data.mission.description,
            url: this.configService.get('FRONTEND_URL') + '/admin-console',
            color: 16776960,
            fields: [
              {
                name: 'STATUS',
                value: data.status,
                inline: true,
              },
              {
                name: 'PENDING',
                value: await this.model.find({ status: 'PENDING' }).countDocuments(),
                inline: true,
              },
            ],
            author: {
              name: profile.displayName,
              // url: '', // quiz result url
              icon_url: profile.photoUrl,
            },
            footer: {
              text: 'Timestamp',
            },
            timestamp: data.date,
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
