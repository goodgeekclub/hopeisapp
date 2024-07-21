import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { QuestionService } from './question.service';

interface Answer {
  questionId: number;
  questionTitle: string;
  choice: string;
  score: number;
}

interface Profile {
  user: string;
  answers: Answer[];
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

  async saveAnswer(questionId: number, choice: string): Promise<void> {
    const profile = this.getProfile();
    if (profile) {
      try {
        const question = await this.questionService
          .getQuestion(questionId.toString())
          .toPromise();

        if (question) {
          const choiceScore =
            question.choices.find((c) => c.title === choice)?.score || 0;

          const existingAnswerIndex = profile.answers.findIndex(
            (answer) => answer.questionId === questionId
          );

          const answer: Answer = {
            questionId,
            questionTitle: question.title,
            choice,
            score: choiceScore,
          };

          if (existingAnswerIndex >= 0) {
            profile.answers[existingAnswerIndex] = answer;
          } else {
            profile.answers.push(answer);
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
