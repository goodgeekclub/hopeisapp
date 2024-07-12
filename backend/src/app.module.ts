import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { mongooseConnection } from './configs/mongoose.config';
import { QuizesModule } from './features/quizes/quizes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    mongooseConnection.root,
    QuizesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
