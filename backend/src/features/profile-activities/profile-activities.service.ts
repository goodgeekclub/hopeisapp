import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileActivityDto } from './dto/create-profile-activity.dto';
import { UpdateProfileActivityDto } from './dto/update-profile-activity.dto';
import { ActivityStatus, ProfileActivity } from 'src/schemas/profile-activity.schema';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryOptionsDto } from 'src/dto/query-options.dto';
import { DateTime } from 'luxon'
import { ProfilesService } from '../profiles/profiles.service';
@Injectable()
export class ProfileActivitiesService {
  constructor(
    private profilesService: ProfilesService,
    @InjectModel(COLLECTION_NAME.PROFILE_ACTIVITIES) private model: Model<ProfileActivity>
  ) {}
  async create(dto: CreateProfileActivityDto) {
    const activity = new this.model(dto);
    if (!dto.date) {
      activity.date = DateTime.now().setZone('UTC+7').toISODate();
    }
    if (!dto.status) {
      activity.status = ActivityStatus.TODO;
    }
    const profile = await this.profilesService.findOne(dto.profile);
    if (!profile) {
      throw new BadRequestException(`profile ${dto.profile} does not existed`);
    }
    activity.character = profile.character;
    return activity.save();
  }

  findAll(options?: QueryOptionsDto) {
    const find = this.model.find();
    find.limit(options?.limit);
    find.skip(options?.skip);
    find.sort({ createdAt: 'asc' })
    return this.model.find().exec();  }

  findOne(id: string) {
    return this.model.findById(id).then(activity => {
      if (!activity) {
        throw new NotFoundException('ProfileActivity does not existed');
      }
    });
  }

  update(id: string, updateProfileActivityDto: UpdateProfileActivityDto) {
    return this.model.findByIdAndUpdate(id, updateProfileActivityDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
