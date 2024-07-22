import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Profile } from 'src/schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { from } from 'rxjs';
@Injectable()
export class ProfilesService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(COLLECTION_NAME.PROFILE) private model: Model<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = new this.model(createProfileDto);
    return from(profile.save());
  }

  findAll() {
    const allProfile = this.model.find().exec();
    return from(allProfile);
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return from(this.model.findByIdAndUpdate(id, updateProfileDto));
  }

  remove(id: string) {
    return from(this.model.findByIdAndDelete(id));
  }
}
