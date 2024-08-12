import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongooseConnection } from './configs/mongoose.config';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './features/profiles/profiles.module';
import { DataModule } from './features/data/data.module';
import { QuizResultsModule } from './features/quiz-results/quiz-results.module';
import { ProfileActivitiesModule } from './features/profile-activities/profile-activities.module';
import { MeModule } from './features/me/me.module';
import { MailModule } from './features/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { HttpModule } from '@nestjs/axios';

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
      defaults: {
        from: `"Hope is Us" <${process.env.EMAIL_USER}>`,
      },
      template: {
        dir: join(__dirname, 'features/mail/templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    HttpModule,
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
