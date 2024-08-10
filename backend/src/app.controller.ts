import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('test')
  getTest() {
    // return this.appService.getCollections();
    return this.appService.getDabase();
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
