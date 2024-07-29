import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { ProfilesModule } from '../profiles/profiles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ProfilesModule,
    AuthModule,
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
