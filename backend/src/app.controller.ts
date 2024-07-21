import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FireBaseAuthGuard } from './auth/strategies/firebase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('test')
  getTest() {
    return this.appService.getCollections();
  }

  @Get('hello')
  @UseGuards(FireBaseAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
