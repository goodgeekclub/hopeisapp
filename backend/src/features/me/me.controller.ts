import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthRole } from 'src/auth/auth.guard';
import { MeService } from './me.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from 'src/decorators/auth.docorator';
import { UpdateProfileDto } from '../profiles/dto/update-profile.dto';
import { CreateMeProfileDto } from './dto/create-me-profile.dto';
import { FbProfilesInterceptor } from './fb-profiles.interceptor';
import { ProfileUser } from 'src/decorators/profile-user.decorator';
import { UpdateMeActivityDto } from './dto/update-me-activity.dto';

@Controller('me')
@Auth(AuthRole.User)
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  getAuth(@AuthUser() authUser) {
    return authUser;
  }

  @Post('profile')
  async createProfile(@AuthUser() authUser, @Body() body: CreateMeProfileDto) {
    return this.meService.createProfile(body.quizResultId, authUser);
  }

  @Get('profile')
  @UseInterceptors(FbProfilesInterceptor)
  async getProfile(@AuthUser() authUser) {
    return this.meService.getProfile(authUser.uid);
  }

  @Patch('profile')
  async updateProfile(@AuthUser() authUser, @Body() body: UpdateProfileDto) {
    return this.meService.updateProfile(authUser.uid, body);
  }

  @Get('activities')
  @UseInterceptors(FbProfilesInterceptor)
  listActivities(@ProfileUser() profile) {
    return this.meService.listActivities(profile._id);
  }

  @Post('activities')
  @UseInterceptors(FbProfilesInterceptor)
  createActivity(
    @ProfileUser() profile,
    @Param('id') id,
    @Body() body: UpdateMeActivityDto,
  ) {
    body.profile = profile._id;
    return this.meService.createActivity(body);
  }

  @Get('activities/:id')
  @UseInterceptors(FbProfilesInterceptor)
  getActivities(@ProfileUser() profile, @Param('id') id) {
    return this.meService.getActivity(profile._id, id);
  }

  @Patch('activities/:id')
  @UseInterceptors(FbProfilesInterceptor)
  updateActivity(
    @ProfileUser() profile,
    @Param('id') id,
    @Body() body: UpdateMeActivityDto,
  ) {
    body.profile = profile._id;
    return this.meService.updateActivity(profile._id, id, body);
  }

  @Post()
  @UseInterceptors(FbProfilesInterceptor)
  createMission(@ProfileUser() profile) {
    return profile;
  }
}
