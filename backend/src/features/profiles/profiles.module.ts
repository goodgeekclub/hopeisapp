import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';

@Module({
  imports: [ mongooseConnection.profiles ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
