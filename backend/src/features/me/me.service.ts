import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class MeService {
  constructor(private profilesService: ProfilesService) {}

  async createProfile(id: string, fbId: string) {
    return this.profilesService.update(id, {
      firebaseId: fbId
    })
  }

  updateProfile(fbId: string, body: any) {
    return this.profilesService.updateByFbId(fbId, body);
  }

  async getProfile(fbId: string) {
    const profile = await this.profilesService.findByFbId(fbId);
    if (!profile) {
      throw new NotFoundException('User have not sync with profile id yet.');
    }
    return profile;
  }
}
