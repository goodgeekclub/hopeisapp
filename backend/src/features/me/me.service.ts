import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileActivitiesService } from '../profile-activities/profile-activities.service';
import { pid } from 'process';

@Injectable()
export class MeService {
  constructor(private profilesService: ProfilesService, private activitiesService: ProfileActivitiesService) {}

  createProfile(id: string, fbId: string) {
    return this.profilesService.update(id, {
      firebaseId: fbId
    })
  }

  updateProfile(fbId: string, body: any) {
    return this.profilesService.updateByFbId(fbId, body);
  }

  async getProfile(fbId: string) {
    return this.profilesService.findByFbId(fbId);
  }

  listActivities(pid: string) {
    return this.activitiesService.ListbyPId(pid);
  }

  getActivity(pid: string, id: string) {
    return this.activitiesService.getModel().findOne({
      profile: pid,
      _id: id
    })
  }

  createActivity(body: any) {
    return this.activitiesService.create(body)
  }

  updateActivity(profile: string, id: string, body: any) {
    return this.activitiesService.getModel().updateOne({
      profile,
      id,
    }, body);
  }
}
