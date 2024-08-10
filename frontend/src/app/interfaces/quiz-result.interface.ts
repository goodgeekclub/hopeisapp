import { Character } from './character.interface';

export interface QuizResult {
  _id?: string;
  score: number;
  character: Character;
  displayName: string;
}
