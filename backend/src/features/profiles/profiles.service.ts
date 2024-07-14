import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Profile } from 'src/schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(COLLECTION_NAME.PROFILE) private model: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const profile = new this.model(createProfileDto);
    return profile.save();
  }

  async findAll() {
    const allProfile = this.model.find().exec();
    return allProfile;
  }

  async findOne(id: string) {
    return this.model.findById(id);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.model.findByIdAndUpdate(id, updateProfileDto);
  }

  async remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}

// ถูกไหม?
