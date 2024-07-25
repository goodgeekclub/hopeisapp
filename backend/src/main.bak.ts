import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongooseInterceptor } from './interceptors/mongoose.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeApp } from 'firebase-admin/app';
import { firebaseConfig } from './configs/firebase.config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  initializeApp(firebaseConfig);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new MongooseInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Hopeis Backend API')
    .setDescription('This is backend for data of Hopeis application')
    .setVersion('0.1')
    .addTag('Quiz')
    .addTag('Profile')
    .addTag('Data')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors();
  }

  await app.listen(3000);
}
bootstrap();
