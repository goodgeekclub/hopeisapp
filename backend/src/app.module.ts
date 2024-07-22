import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongooseConnection } from './configs/mongoose.config';
import { AuthModule } from './auth/auth.module';

import { ProfilesModule } from './features/profiles/profiles.module';
import { DataModule } from './features/data/data.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    mongooseConnection.root,
    AuthModule,
    ProfilesModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
