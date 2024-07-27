import { Character } from '../Enum/Character';

export interface ICharacter {
  bgLink: string;
  characterNameEn: Character;
  characterNameTh: string;
  characterTitle: string;
  characterImgLink: string;
  characterDescription: string;
  characterAttributes: string[];
  attributesChipColor: string;
  shinningMethod: string;
}
