import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { QuestionService, Choice } from './question.service';

interface Profile {
  user: string;
  answers: { questionId: number; choice: Choice; questionTitle: string }[];
  currentQuestionId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileKey = 'profile';

  constructor(
    private storageService: LocalStorageService,
    private questionService: QuestionService
  ) {}

  createProfile(userName: string): void {
    const profile: Profile = {
      user: userName,
      answers: [],
      currentQuestionId: 1,
    };
    this.storageService.set(this.profileKey, JSON.stringify(profile));
  }

  getProfile(): Profile | null {
    const profileData = this.storageService.get(this.profileKey);
    return profileData ? JSON.parse(profileData) : null;
  }

  updateProfile(profile: Profile): void {
    this.storageService.set(this.profileKey, JSON.stringify(profile));
  }

  async saveAnswer(questionId: number, choice: Choice): Promise<void> {
    const profile = this.getProfile();
    if (profile) {
      try {
        const question = await this.questionService
          .getQuestion(questionId.toString())
          .toPromise();

        if (question) {
          const existingAnswerIndex = profile.answers.findIndex(
            (answer) => answer.questionId === questionId
          );

          if (existingAnswerIndex >= 0) {
            profile.answers[existingAnswerIndex] = {
              questionId,
              choice,
              questionTitle: question.title,
            };
          } else {
            profile.answers.push({
              questionId,
              choice,
              questionTitle: question.title,
            });
          }

          this.updateProfile(profile);
        } else {
          console.error(`Question with id ${questionId} not found.`);
        }
      } catch (error) {
        console.error(`Failed to fetch question: ${error}`);
      }
    }
  }

  setCurrentQuestionId(questionId: number): void {
    const profile = this.getProfile();
    if (profile) {
      profile.currentQuestionId = questionId;
      this.updateProfile(profile);
    }
  }

  getCurrentQuestionId(): number {
    const profile = this.getProfile();
    return profile ? profile.currentQuestionId : 1;
  }
}
