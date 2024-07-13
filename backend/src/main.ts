import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase-admin/app';
import { config } from './firebase-config/config';

async function bootstrap() {
  initializeApp(config);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
