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
    return profile.save();
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  findByFbId(fbId: string) {
    return this.model
      .findOne({
        firebaseId: fbId,
      })
      .populate('quizResult');
  }

  update(id: string, body: UpdateProfileDto) {
    return from(this.model.findByIdAndUpdate(id, body));
  }

  updateByFbId(fbId: string, body: UpdateProfileDto) {
    if (body.firebaseId) {
      delete body.firebaseId;
    }
    return this.model.updateOne(
      {
        firebaseId: fbId,
      },
      body,
    );
  }

  remove(id: string) {
    return from(this.model.findByIdAndDelete(id));
  }
}
