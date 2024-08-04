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
@Injectable()
export class ProfileActivitiesService {
  constructor(
    private profilesService: ProfilesService,
    @InjectModel(COLLECTION_NAME.PROFILE_ACTIVITIES)
    private model: Model<ProfileActivity>,
    private dataService: DataService,
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
      .findById<Mission>(dto.missionId);
    if (!mission) {
      throw new BadRequestException(`mission ${missionId} does not existed`);
    }
    activity.profile = profile;
    activity.mission = mission;
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

  findOne(id: string) {
    return this.model.findById(id).then((activity) => {
      if (!activity) {
        throw new NotFoundException('ProfileActivity does not existed');
      }
    });
  }

  ListbyPId(pid: string, query?: any) {
    return this.model.find({
      profile: pid,
      ...query,
    });
  }

  update(id: string, updateProfileActivityDto: UpdateProfileActivityDto) {
    return this.model.findByIdAndUpdate(id, updateProfileActivityDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
