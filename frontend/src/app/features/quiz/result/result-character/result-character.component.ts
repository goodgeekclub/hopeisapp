import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { Character } from '../../../../interfaces/character.interface';
import { QuizResultService } from '../../../../services/quiz-result.service';
import { ActivatedRoute } from '@angular/router';

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
  @Input() public character = '';
  public displayName = '';
  public characterData?: Character;
  public isLoading = true;
  public quizResultId: string | undefined;
  public totalPlayer: number = 0;

  constructor(
    private quizResultService: QuizResultService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizResultId = params['id'];
      this.setCharacterInfo();
      this.getTotalPlayer();
      console.log('Test ID:', this.quizResultId);
    });
  }

  public getTotalPlayer(): void {
    this.totalPlayer = 12700;
  }

  private setCharacterInfo(): void {
    const characterBackgrounds: Record<string, string[]> = {
      brave: ['bg-redupbg', 'bg-reddownbg'],
      wisdom: ['bg-purpleupbg', 'bg-purpledownbg'],
      planful: ['bg-blueupbg', 'bg-bluedownbg'],
      harmonious: ['bg-yellowupbg', 'bg-yellowdownbg'],
      sincere: ['bg-greenupbg', 'bg-greendownbg'],
      esthetician: ['bg-orangeupbg', 'bg-orangedownbg'],
    };

    const characterChipColor: Record<string, string> = {
      brave: 'bg-[#eb4d3d]',
      wisdom: 'bg-[#b491d9]',
      planful: 'bg-[#355dbd]',
      harmonious: 'bg-[#ffd76b]',
      sincere: 'bg-[#50eac6]',
      esthetician: 'bg-[#ef8923]',
    };

    const buttonColors: Record<string, string> = {
      brave: 'text-[#b06257]',
      wisdom: 'text-[#80629f]',
      planful: 'text-[#28468e]',
      harmonious: 'text-[#bf9537]',
      sincere: 'text-[#50a190]',
      esthetician: 'text-[#bc8b4e]',
    };

    const displayNameColors: Record<string, string> = {
      brave: 'text-[#ECB0A7]',
      wisdom: 'text-[#E2D4F3]',
      planful: 'text-[#B3DBFF]',
      harmonious: 'text-[#FEFCA9]',
      sincere: 'text-[#C2FDEE]',
      esthetician: 'text-[#FAECBE]',
    };

    this.quizResultService.getQuizResultById(this.quizResultId).subscribe(
      resultResponse => {
        console.log('Fetched quiz result:', resultResponse);

        // Fallback to mock data if needed
        const resultCharacter = resultResponse.character || {};
        const characterNameEn = resultCharacter.name || '';
        const bgClass =
          characterBackgrounds[characterNameEn.toLowerCase()] || '';

        const attributesChipColor =
          characterChipColor[characterNameEn.toLowerCase()] || '';

        const buttonColor = buttonColors[characterNameEn.toLowerCase()] || '';

        const displayNameColor =
          displayNameColors[characterNameEn.toLowerCase()] || '';

        this.characterData = {
          attributesChipColor: attributesChipColor,
          bgClass: bgClass,
          buttonColor: buttonColor,
          characterAttributes: resultCharacter.natures,
          characterDescription: resultCharacter.detail,
          characterImgLink: resultCharacter.photoUrl,
          characterNameEn: resultCharacter.name,
          characterNameTh: resultCharacter.quote,
          characterTitle: this.capitalizeFirstLetter(resultCharacter.title),
          displayNameColor: displayNameColor,
          shinningMethod: resultCharacter.ability,
        };
        console.log(this.characterData);

        this.displayName = resultResponse.displayName || '';

        this.isLoading = false;
      },
      resultError => {
        console.error('Error fetching quiz result by ID:', resultError);
        this.isLoading = false; // Set loading to false in case of an error
      }
    );
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
