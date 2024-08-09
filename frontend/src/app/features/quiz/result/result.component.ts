import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { ResultCharacterComponent } from './result-character/result-character.component';
import { ProfileService } from '../../../services/profile.service';
import { CharacterService } from '../../../services/character.service';
import { QuizResultService } from '../../../services/quiz-result.service'; // Import QuizResultService

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SvgIconComponent,
    ResultCharacterComponent,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  public hasResult = false;
  public displayIndex = 0;
  public isClickedToShowResult = false;
  public isClikedToShowText = false;
  public character = '';
  public characterData: any;
  public displayName = '';
  public quizResultId = '';

  constructor(
    private router: Router, // Inject Router service
    private profileService: ProfileService,
    private characterService: CharacterService,
    private quizResultService: QuizResultService, // Inject QuizResultService
  ) {}

  profile: any;

  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.profile = JSON.parse('');
    // this.getResult();
  }

  public showResult(): void {
    if (this.displayIndex === 0) {
      this.isClikedToShowText = true;
      this.displayIndex++;
    } else if (this.displayIndex === 1 && this.hasResult) {
      this.isClickedToShowResult = true;
      this.displayIndex++;
      this.router.navigate(['/quiz/result/', this.quizResultId]);
    }
  }

  private getResult(): void {
    const profile = this.profileService.getProfile();
    if (profile) {
      this.character = profile.characterType.trim().toLowerCase();
      console.log('Profile character type:', this.character);
      this.hasResult = true;

      this.characterService.getCharacterByType(this.character).subscribe(
        (response) => {
          console.log('Fetched character data:', response);
          const matchingCharacter = response.find(
            (char: any) => char.name.trim().toLowerCase() === this.character,
          );

          if (matchingCharacter) {
            this.characterData = matchingCharacter.data;
            console.log('Character data assigned:', this.characterData);

            // Prepare the data to be POSTed
            const postData = {
              score: profile.characterScore,
              displayName: profile.user,
              character: {
                name: matchingCharacter.data.name,
                title: matchingCharacter.data.title,
                quote: matchingCharacter.data.quote,
                detail: matchingCharacter.data.detail,
                photoUrl: matchingCharacter.data.photoUrl,
                ability: matchingCharacter.data.ability, // Ensure ability is a string
                natures: matchingCharacter.data.natures, // Ensure natures is an array
              },
            };

            // Flag to prevent multiple POSTs
            let hasPosted = false;

            this.quizResultService.postQuizResult(postData).subscribe(
              (postResponse) => {
                if (!hasPosted) {
                  console.log('POST response:', postResponse);
                  this.quizResultId = postResponse._id;
                  hasPosted = true;
                }
              },
              (postError) => {
                console.error('Error posting data:', postError);
              },
            );
          } else {
            console.log('Character not found.');
          }
        },
        (error) => {
          console.error('Error fetching character data:', error);
        },
      );
    } else {
      console.error('Profile not found');
    }
  }
}
