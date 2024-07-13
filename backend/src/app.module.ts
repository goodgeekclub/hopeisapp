import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongooseConnection } from './configs/mongoose.config';
import { QuizesModule } from './features/quizes/quizes.module';
import { ProfilesModule } from './features/profiles/profiles.module';
import { AbcModule } from './features/abc/abc.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    mongooseConnection.root,
    QuizesModule,
    ProfilesModule,
    AbcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
