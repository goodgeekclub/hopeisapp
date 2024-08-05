import { CharacterData } from './character-data.interface';

export interface QuizResult {
  _id?: string;
  score: number;
  character: CharacterData;
  displayName: string;
}
