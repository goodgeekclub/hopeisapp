import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { Character } from '../../../../interfaces/character.interface';
import { characterMockData } from '../../../../mocks/character';
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
  quizResultId: string | undefined;

  constructor(
    private quizResultService: QuizResultService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizResultId = params['id'];
      this.setCharacterInfo();
      console.log('Test ID:', this.quizResultId);
    });
  }

  private setCharacterInfo(): void {
    const characterBackgrounds: Record<string, string> = {
      brave: '/images/red-bg-full.png',
      wisdom: '/images/purple-bg-full.png',
      planful: '/images/blue-bg-full.png',
      harmonious: '/images/yellow-bg-full.png',
      sincere: '/images/green-bg-full.png',
      esthetician: '/images/orange-bg-full.png',
    };

    const characterChipColor: Record<string, string> = {
      brave: 'bg-[#eb4d3d]',
      wisdom: 'bg-[#b491d9]',
      planful: 'bg-[#355dbd]',
      harmonious: 'bg-[#ffd76b]',
      sincere: 'bg-[#50eac6]',
      esthetician: 'bg-[#ef8923]',
    };

    this.quizResultService.getQuizResultById(this.quizResultId).subscribe(
      (resultResponse) => {
        console.log('Fetched quiz result:', resultResponse);

        // Fallback to mock data if needed
        const resultCharacter = resultResponse.character || {};
        const characterNameEn = resultCharacter.name || '';
        const bgLink =
          characterBackgrounds[characterNameEn.toLowerCase()] || '';

        const attributesChipColor =
          characterChipColor[characterNameEn.toLowerCase()] || '';

        this.characterData = {
          bgLink: bgLink,
          characterNameEn: resultCharacter.name,
          characterNameTh: resultCharacter.quote,
          characterTitle: resultCharacter.title,
          characterImgLink: resultCharacter.photoUrl,
          characterDescription: resultCharacter.detail,
          characterAttributes: resultCharacter.natures,
          attributesChipColor: attributesChipColor,
          shinningMethod: resultCharacter.ability,
        };

        this.displayName = resultResponse.displayName || '';

        this.isLoading = false;
      },
      (resultError) => {
        console.error('Error fetching quiz result by ID:', resultError);
        this.isLoading = false; // Set loading to false in case of an error
      },
    );
  }
}
