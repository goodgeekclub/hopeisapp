import { Injectable } from '@nestjs/common';
import { CreateProfileActivityDto } from './dto/create-profile-activity.dto';
import { UpdateProfileActivityDto } from './dto/update-profile-activity.dto';

@Injectable()
export class ProfileActivitiesService {
  create(createProfileActivityDto: CreateProfileActivityDto) {
    return 'This action adds a new profileActivity';
  }

  findAll() {
    return `This action returns all profileActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileActivity`;
  }

  update(id: number, updateProfileActivityDto: UpdateProfileActivityDto) {
    return `This action updates a #${id} profileActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileActivity`;
  }
}
