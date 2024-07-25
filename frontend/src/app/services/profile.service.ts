import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { QuestionService, Choice } from './question.service';

interface Answer {
  questionId: number;
  questionTitle: string;
  choice: string;
  score: number;
  type: string;
}

interface Profile {
  user: string;
  answers: Answer[];
  currentQuestionId: number;
  characterType: string;
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
      characterType: '',
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

  async saveAnswer(questionId: number, choiceTitle: string): Promise<void> {
    const profile = this.getProfile();
    if (profile) {
      try {
        const question = await this.questionService
          .getQuestion(questionId.toString())
          .toPromise();

        if (question) {
          const choice = question.choices.find((c) => c.title === choiceTitle);

          if (choice) {
            const existingAnswerIndex = profile.answers.findIndex(
              (answer) => answer.questionId === questionId
            );

            const answer: Answer = {
              questionId,
              questionTitle: question.title,
              choice: choice.title,
              score: choice.score,
              type: choice.type,
            };

            if (existingAnswerIndex >= 0) {
              profile.answers[existingAnswerIndex] = answer;
            } else {
              profile.answers.push(answer);
            }

            const highestType = this.getHighestScoreType();
            if (highestType) {
              profile.characterType = highestType.type;
            }

            this.updateProfile(profile);
          } else {
            console.error(`Choice with title ${choiceTitle} not found.`);
          }
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

  getScores(): { [key: string]: number } {
    const profile = this.getProfile();
    if (profile) {
      return profile.answers.reduce((acc, answer) => {
        if (!acc[answer.type]) {
          acc[answer.type] = 0;
        }
        acc[answer.type] += answer.score;
        return acc;
      }, {} as { [key: string]: number });
    }
    return {};
  }

  getHighestScoreType(): { type: string; score: number } | null {
    const scores = this.getScores();
    let highestScore = 0;
    let highestType = '';

    for (const [type, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        highestType = type;
      }
    }

    return highestType ? { type: highestType, score: highestScore } : null;
  }

  clearProfile(): void {
    this.storageService.remove(this.profileKey);
  }
}
