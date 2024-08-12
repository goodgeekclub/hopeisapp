import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongooseConnection } from './configs/mongoose.config';
import { AuthModule } from './auth/auth.module';

import { ProfilesModule } from './features/profiles/profiles.module';
import { DataModule } from './features/data/data.module';
import { QuizResultsModule } from './features/quiz-results/quiz-results.module';
import { ProfileActivitiesModule } from './features/profile-activities/profile-activities.module';
import { MeModule } from './features/me/me.module';
import { MailModule } from './features/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    ConfigModule.forRoot(),
    mongooseConnection.root,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    AuthModule,
    ProfilesModule,
    DataModule,
    QuizResultsModule,
    ProfileActivitiesModule,
    MeModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
