import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { ResultCharacterComponent } from './result-character/result-character.component';
import { ProfileService } from '../../../services/profile.service';
import { CharacterService } from '../../../services/character.service';
import { QuizResultService } from '../../../services/quiz-result.service'; // Import QuizResultService
import { map, Observable, of, switchMap } from 'rxjs';

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
  public quizResultId = '';

  constructor(
    private router: Router, // Inject Router service
    private profileService: ProfileService,
    private characterService: CharacterService,
    private quizResultService: QuizResultService // Inject QuizResultService
  ) {}

  ngOnInit() {
    this.getResult()
      .pipe(switchMap(result => this.quizResultService.postQuizResult(result)))
      .subscribe(response => {
        this.isClikedToShowText = true;
        this.quizResultId = response._id;
      });
  }

  public showResult(): void {
    if (this.quizResultId) {
      this.router.navigate(['/quiz/result/', this.quizResultId]);
    }
  }

  private getResult(): Observable<any> {
    const profile = this.profileService.getProfile();
    if (!profile) {
      this.router.navigate(['/home']);
      return of(null);
    }
    this.character = profile.characterType.trim().toLowerCase();
    return this.characterService.getCharacterByType(this.character).pipe(
      map((response: any[]) => {
        const matchingCharacter = response.find(
          (char: any) => char.name.trim().toLowerCase() === this.character
        );
        return {
          score: profile.characterScore,
          displayName: profile.user,
          character: matchingCharacter.data,
        };
      })
    );
  }
}
