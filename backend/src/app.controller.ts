import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('test')
  getTest() {
    return this.appService.getCollections();
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
