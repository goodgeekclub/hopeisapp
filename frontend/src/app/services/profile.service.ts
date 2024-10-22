import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { QuestionService } from './question.service';
import { CharacterService } from './character.service';

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
  characterScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileKey = 'profile';

  constructor(
    private storageService: LocalStorageService,
    private questionService: QuestionService,
    private characterService: CharacterService,
  ) {}

  createProfile(userName: string): void {
    const profile: Profile = {
      user: userName,
      answers: [],
      currentQuestionId: 1,
      characterType: '',
      characterScore: 0,
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
              (answer) => answer.questionId === questionId,
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

            const highestScoreType = this.getHighestScoreType();
            if (highestScoreType) {
              profile.characterType = highestScoreType.type;
              profile.characterScore = highestScoreType.score;
            } else {
              profile.characterType = '';
              profile.characterScore = 0;
            }

            this.updateProfile(profile);
          } else {
            console.error(`Choice with title ${choiceTitle} not found.`);
          }
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

  getScores(): Record<string, { scores: number[]; total: number }> {
    const profile = this.getProfile();
    if (profile) {
      return profile.answers.reduce(
        (acc, answer) => {
          if (!acc[answer.type]) {
            acc[answer.type] = { scores: [0, 0, 0, 0, 0], total: 0 };
          }
          const scoreIndex = answer.questionId - 1;
          if (scoreIndex >= 0 && scoreIndex < 5) {
            acc[answer.type].scores[scoreIndex] = answer.score;
          }
          acc[answer.type].total += answer.score;
          return acc;
        },
        {} as Record<string, { scores: number[]; total: number }>,
      );
    }
    return {};
  }

  getHighestScoreType(): { type: string; score: number } | null {
    const scores = this.getScores();
    let highestScore = 0;
    const highestTypes: { type: string; score: number }[] = [];

    for (const [type, scoreData] of Object.entries(scores)) {
      if (scoreData.total > highestScore) {
        highestScore = scoreData.total;
        highestTypes.length = 0;
        highestTypes.push({ type, score: scoreData.total });
      } else if (scoreData.total === highestScore) {
        highestTypes.push({ type, score: scoreData.total });
      }
    }

    if (highestTypes.length > 0) {
      const randomIndex = Math.floor(Math.random() * highestTypes.length);
      return highestTypes[randomIndex];
    }

    return null;
  }

  clearProfile(): void {
    this.storageService.remove(this.profileKey);
  }
}
