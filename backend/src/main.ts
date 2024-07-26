import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongooseInterceptor } from './interceptors/mongoose.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

let server: Handler;
async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LoggingInterceptor());
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

  const expressApp = app.getHttpAdapter().getInstance();
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors();
  }
  await app.init();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
