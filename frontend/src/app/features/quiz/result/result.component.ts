import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { ResultCharacterComponent } from './result-character/result-character.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [SharedModule, CommonModule, SvgIconComponent, ResultCharacterComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  public hasResult = false;
  public displayIndex = 0;
  public isClickedToShowResult = false;
  public isClikedToShowText = false;

  constructor() {}
  ngOnInit(): void {
    this.getResult();
  }

  public showResult(): void {
    switch (this.displayIndex) {
      case 0:
        this.isClikedToShowText = true;
        this.displayIndex++;
        break;
      case 1:
        if (this.hasResult) {
          this.isClickedToShowResult = true;
          this.displayIndex++;
        }
        break;
      default:
        break;
    }
  }

  private getResult(): void {
    setTimeout(() => {
      this.hasResult = true;
    }, 1000);
  }
}
