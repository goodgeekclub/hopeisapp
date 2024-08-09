import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileActivitiesService } from '../profile-activities/profile-activities.service';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';
import { QuizResultsService } from '../quiz-results/quiz-results.service';
import { CreateProfileActivityDto } from '../profile-activities/dto/create-profile-activity.dto';
import { DataService } from '../data/data.service';
import { Profile } from 'src/schemas';
import { ActivityStatus } from 'src/schemas/profile-activity.schema';
import { ListActivityQuery } from './dto/list-activity-query';
import { DateTime } from 'luxon';

@Injectable()
export class MeService {
  constructor(
    private profilesService: ProfilesService,
    private quizResultsService: QuizResultsService,
    private activitiesService: ProfileActivitiesService,
    private dataService: DataService,
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

  /********************
   * Activity
   ********************/

  listActivities(pid: string, query: ListActivityQuery) {
    return this.activitiesService.ListbyPId(pid, query);
  }

  getActivity(pid: string, id: string) {
    return this.activitiesService.getModel().findOne({
      profile: pid,
      _id: id,
    });
  }

  async createActivity(profile: Profile) {
    const today = await this.getTodayActivity((profile as any)._id);
    if (today.length > 0) {
      throw new BadRequestException(
        `Activity has been active in ${today[0]._id.toString()} status ${today[0].status}`,
      );
    }
    const relevantMissions = await this.dataService.getModel().find({
      type: 'MISSION',
      'data.characterNames': {
        $eq: profile.character.name,
      },
    });
    const ranIdx = Math.floor(Math.random() * relevantMissions.length);
    const mission = relevantMissions.at(ranIdx);
    const body: CreateProfileActivityDto = {
      profileId: (profile as any)._id,
      missionId: mission._id.toString(),
      status: ActivityStatus.DOING,
      coinValue: 0,
    };
    return this.activitiesService.create(body);
  }

  updateActivity(profile: string, id: string, body: any) {
    return this.activitiesService.update(id, body);
  }

  getActiveActivity(profileId: string) {
    return this.activitiesService.getModel().find({
      profile: profileId,
      status: {
        $in: ['DOING', 'PENDING'],
      },
    });
  }

  getTodayActivity(profileId: string) {
    return this.activitiesService.getToday(profileId);
  }
}
