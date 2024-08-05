import { QuizResult } from './quiz-result.interface';
import { CharacterData } from './character-data.interface';

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
  character: CharacterData;
  quizResult: QuizResult;
}
