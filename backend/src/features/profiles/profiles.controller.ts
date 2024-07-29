import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfilesInterceptor } from './profiles.interceptor';
import { Admin, AuthGuard, AuthRole, Public } from 'src/auth/auth.guard';
import { Auth } from 'src/decorators/auth.docorator';

@ApiTags('Profiles')
@Auth(AuthRole.Admin)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Public()
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ProfilesInterceptor)
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(ProfilesInterceptor)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @UseInterceptors(ProfilesInterceptor)
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
