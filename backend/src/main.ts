import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongooseInterceptor } from './interceptors/mongoose.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeApp } from 'firebase-admin/app';
import { config } from './firebase/firebase-config/config';

async function bootstrap() {
  initializeApp(config);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new MongooseInterceptor());

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Hopeis Backend API')
    .setDescription('This is backend for data of Hopeis application')
    .setVersion('0.1')
    .addTag('Quiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
