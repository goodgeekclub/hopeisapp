import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { ResultCharacterComponent } from './result-character/result-character.component';
import { ProfileService } from '../../../services/profile.service';

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
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  public hasResult = false;
  public displayIndex = 0;
  public isClickedToShowResult = false;
  public isClikedToShowText = false;
  public character = '';

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
    }
  }

  private getResult(): void {
    setTimeout(() => {
      this.profile = this.profileService.getProfile();
      if (this.profile) {
        this.character = this.profile.characterType;
        this.hasResult = true;
      }
    }, 1000);
  }
}
