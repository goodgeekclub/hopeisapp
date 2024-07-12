import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
//   const config = {
//     apiKey: '***',
//     authDomain: '***.firebaseapp.com',
//     databaseURL: 'https://***.firebaseio.com',
//     projectId: '***',
//     storageBucket: '***.appspot.com',
//     messagingSenderId: '***',
//     credential: credential.cert(***)
// };
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
