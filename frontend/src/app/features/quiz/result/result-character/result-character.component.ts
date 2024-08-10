import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { QuizResultService } from '../../../../services/quiz-result.service';
import { ActivatedRoute } from '@angular/router';
import { CharacterData } from '../../../../interfaces/character-data.interface';

interface CharacterPreset {
  backgroundColor: string[],
  chipColor: string,
  buttonColor: string,
  nameColor: string,
}
export interface CharacterDisplay {
  characterAttributes: string[];
  characterDescription: string;
  characterImgLink: string;
  characterNameEn: string;
  characterNameTh: string;
  characterTitle: string;
  shinningMethod: string;
}

@Component({
  selector: 'app-result-character',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SvgIconComponent,
    CharacterAttributesComponent,
  ],
  templateUrl: './result-character.component.html',
  styleUrls: ['./result-character.component.css'],
})
export class ResultCharacterComponent implements OnInit {
  displayName = '';
  characterData?: CharacterDisplay;
  isLoading = true;
  totalPlayer = 0;
  preset = this.getPreset();

  constructor(
    private quizResultService: QuizResultService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('data', this.route.snapshot.data);
    const quizResult = this.route.snapshot.data['quizResult'];
    this.setCharacterDisplay(quizResult.character)
    this.isLoading = false;
    this.displayName = quizResult.displayName;
  }

  public getTotalPlayer(): void {
    this.totalPlayer = 12700;
  }

  public setCharacterDisplay(character: CharacterData) {
    this.preset = this.getPreset(character.name);
    this.characterData = {
      characterAttributes: character.natures,
      characterDescription: character.ability,
      characterImgLink: character.photoUrl,
      characterNameEn: this.capitalizeFirstLetter(character.title),
      characterNameTh: character.description,
      characterTitle: character.quote,
      shinningMethod: character.detail,
    }
  }

  private getPreset(name?: string): CharacterPreset {
    const presets: Record<string, CharacterPreset> = {
      brave: {
        backgroundColor: ['bg-redupbg', 'bg-reddownbg'],
        chipColor: 'bg-[#eb4d3d]',
        buttonColor: 'text-[#b06257]',
        nameColor: 'text-[#ECB0A7]',
      },
      wisdom: {
        backgroundColor: ['bg-purpleupbg', 'bg-purpledownbg'],
        chipColor: 'bg-[#b491d9]',
        buttonColor: 'text-[#80629f]',
        nameColor: 'text-[#E2D4F3]',
      },
      planful: {
        backgroundColor: ['bg-blueupbg', 'bg-bluedownbg'],
        chipColor: 'bg-[#355dbd]',
        buttonColor: 'bg-[#ffd76b]',
        nameColor: 'text-[#bf9537]',
      },
      harmonious: {
        backgroundColor: ['bg-yellowupbg', 'bg-yellowdownbg'],
        chipColor: 'bg-[#ffd76b]',
        buttonColor: 'text-[#bf9537]',
        nameColor: 'text-[#FEFCA9]',
      },
      sincere: {
        backgroundColor: ['bg-greenupbg', 'bg-greendownbg'],
        chipColor: 'bg-[#50eac6]',
        buttonColor: 'text-[#50a190]',
        nameColor: 'text-[#C2FDEE]',
      },
      esthetician: {
        backgroundColor: ['bg-orangeupbg', 'bg-orangedownbg'],
        chipColor: 'bg-[#ef8923]',
        buttonColor: 'text-[#bc8b4e]',
        nameColor: 'text-[#FAECBE]',
      }
    }
    if (name && presets.hasOwnProperty(name)) {
      return presets[name];
    } else {
      return {
        backgroundColor: ['text-white', 'text-white'],
        chipColor: 'text-white',
        buttonColor: 'text-black',
        nameColor: 'text-white'
      }
    }
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
