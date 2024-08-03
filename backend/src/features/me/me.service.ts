import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileActivitiesService } from '../profile-activities/profile-activities.service';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';
import { QuizResultsService } from '../quiz-results/quiz-results.service';

@Injectable()
export class MeService {
  constructor(
    private profilesService: ProfilesService,
    private quizResultsService: QuizResultsService,
    private activitiesService: ProfileActivitiesService,
  ) {}

  async createProfile(quizResultId: string, authUser: any) {
    const existing = await this.profilesService.findByFbId(authUser.uid);
    if (existing) {
      throw new BadRequestException('Profile already created');
    }
    const result = await this.quizResultsService.findOne(quizResultId);
    if (!result) {
      throw new NotFoundException('QuizResult does not existed');
    }
    const body: CreateProfileDto = {
      fullName: authUser.name,
      displayName: result.displayName,
      email: authUser.email,
      photoUrl: authUser.picture,
      firebaseId: authUser.uid,
      character: result.character,
      quizResult: quizResultId,
    };
    return this.profilesService.create(body).then((profile) => {
      result.profile = profile._id.toString();
      return profile.populate('quizResult');
    });
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
      _id: id,
    });
  }

  createActivity(body: any) {
    return this.activitiesService.create(body);
  }

  updateActivity(profile: string, id: string, body: any) {
    return this.activitiesService.getModel().updateOne(
      {
        profile,
        id,
      },
      body,
    );
  }
}
