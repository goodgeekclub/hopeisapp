import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileActivitiesService } from './profile-activities.service';
import { CreateProfileActivityDto } from './dto/create-profile-activity.dto';
import { UpdateProfileActivityDto } from './dto/update-profile-activity.dto';
import { QueryOptions } from 'src/decorators/query-options.decorator';
import { QueryOptionsDto } from 'src/dto/query-options.dto';

@Controller('profile-activities')
export class ProfileActivitiesController {
  constructor(private readonly profileActivitiesService: ProfileActivitiesService) {}

  @Post()
  create(@Body() createProfileActivityDto: CreateProfileActivityDto) {
    return this.profileActivitiesService.create(createProfileActivityDto);
  }

  @Get()
  findAll(@QueryOptions() options: QueryOptionsDto) {
    return this.profileActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileActivitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileActivityDto: UpdateProfileActivityDto) {
    return this.profileActivitiesService.update(id, updateProfileActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileActivitiesService.remove(id);
  }
}
