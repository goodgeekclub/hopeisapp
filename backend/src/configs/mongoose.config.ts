import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { DataSchema } from 'src/schemas/data.schema';

export const COLLECTION_NAME = {
  QUIZ: 'quizes',
  PROFILE: 'profiles',
  DATA: 'dataset',
};

export const mongooseConnection = {
  root: MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGODB_CONNECTION_STRING'),
    }),
    inject: [ConfigService],
  }),
  profiles: MongooseModule.forFeature([
    { name: COLLECTION_NAME.PROFILE, schema: ProfileSchema },
  ]),
  dataset: MongooseModule.forFeature([
    { name: COLLECTION_NAME.DATA, schema: DataSchema },
  ]),
};
