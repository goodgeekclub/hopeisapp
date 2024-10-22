import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Data, DataType } from 'src/schemas/data.schema';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { from } from 'rxjs';
import nodemailer from 'nodemailer';

@Injectable()
export class DataService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(COLLECTION_NAME.DATA) private model: Model<Data<any>>,
  ) {}

  getModel() {
    return this.model;
  }

  create(createDataDto: CreateDataDto) {
    const data = new this.model(createDataDto);
    return from(data.save());
  }

  findAll(type?: DataType, name?: string) {
    // const allData = this.model.find({ type }).exec();
    console.log(type);
    let data = this.model.find();
    if (type) {
      data = data.where({ type });
    }
    if (name) {
      data = data.where({ name });
    }
    return from(data);
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateDataDto: UpdateDataDto) {
    return from(this.model.findByIdAndUpdate(id, updateDataDto));
  }

  remove(id: string) {
    return from(this.model.findByIdAndDelete(id));
  }
}
