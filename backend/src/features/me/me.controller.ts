import { Controller, Get, NotFoundException, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard, AuthRole } from 'src/auth/auth.guard';
import { MeService } from './me.service';
import { AuthUser } from '../../decorators/auth-user.decorator'
import { Auth } from 'src/decorators/auth.docorator';
import { UpdateProfileDto } from '../profiles/dto/update-profile.dto';
import { CreateMeProfileDto } from './dto/create-me-profile.dto';
import { FbProfilesInterceptor } from './fb-profiles.interceptor';

@Controller('me')
@UseInterceptors(FbProfilesInterceptor)
@Auth(AuthRole.User)
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  getAuth(@AuthUser() authUser) {
    return authUser
  }

  @Get('profile')
  async getProfile(@AuthUser() authUser) {
    return this.meService.getProfile(authUser.uid);
  }

  @Post('profile')
  async createProfile(@AuthUser() authUser, body: CreateMeProfileDto) {
    return this.meService.createProfile(body.profileId, authUser.uid);
  }

  @Patch('profile')
  async updateProfile(@AuthUser() authUser, body: UpdateProfileDto) {
    return this.meService.updateProfile(authUser.uid, body)
  }
}
