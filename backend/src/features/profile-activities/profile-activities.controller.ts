import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProfileActivitiesService } from './profile-activities.service';
import { CreateProfileActivityDto } from './dto/create-profile-activity.dto';
import { UpdateProfileActivityDto } from './dto/update-profile-activity.dto';
import { QueryOptions } from 'src/decorators/query-options.decorator';
import { QueryOptionsDto } from 'src/dto/query-options.dto';
import { AuthRole } from 'src/auth/auth.guard';
import { Auth } from 'src/decorators/auth.docorator';
import { ListActivityQuery } from './dto/list-activity-query';
import { isValidObjectId } from 'mongoose';

@Auth(AuthRole.Admin)
@Controller('profile-activities')
export class ProfileActivitiesController {
  constructor(
    private readonly profileActivitiesService: ProfileActivitiesService,
  ) {}

  @Post()
  create(@Body() createProfileActivityDto: CreateProfileActivityDto) {
    return this.profileActivitiesService.create(createProfileActivityDto);
  }

  @Get()
  findAll(
    @QueryOptions() options: QueryOptionsDto,
    @Query() query: ListActivityQuery,
  ) {
    return this.profileActivitiesService.findAll(options, query);
  }

  @Get('today')
  findToday() {
    return this.profileActivitiesService.getToday();
  }

  @Get('stats/')
  getStats() {
    return this.profileActivitiesService.getStats();
  }

  @Get('stats/:profileId')
  getProfileStats(@Param('profileId') profileId: string) {
    if (!isValidObjectId(profileId)) {
      throw new BadRequestException('Invalid Id');
    }
    console.log('profileId:', profileId);
    return this.profileActivitiesService.getProfileStats(profileId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileActivitiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfileActivityDto: UpdateProfileActivityDto,
  ) {
    return this.profileActivitiesService.update(id, updateProfileActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileActivitiesService.remove(id);
  }
}
