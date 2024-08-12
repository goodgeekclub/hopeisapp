import { QuizResult } from './quiz-result.interface';
import { Character } from './character.interface';

export interface Me {
  _id: string;
  displayName: string;
  email: string;
  metadata: {
    totalCoin: number;
    missionSuccess: number;
  };
  fcmToken?: string;
  photoUrl: string;
  firebaseId: string;
  character: Character;
  quizResult: QuizResult;
}

export interface MeStat {
  total: number;
  success: number;
  coin: number;
}