import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { QuestionService } from './question.service';

interface Profile {
  user: string;
  answers: string[];
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
    const numberOfQuestions = this.questionService.getTotalQuestions();

    const profile: Profile = {
      user: userName,
      answers: new Array(numberOfQuestions).fill(''),
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

  saveAnswer(questionId: number, answer: string): void {
    const profile = this.getProfile();
    if (profile) {
      profile.answers[questionId - 1] = answer;
      this.updateProfile(profile);
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
