import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [SharedModule, CommonModule, SvgIconComponent ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  public hasResult = false;
  public isClickedToShowResult = false;
  constructor() {}
  ngOnInit(): void {
    this.getResult();
  }

  public showResult(): void {
    if (!this.hasResult) return;
    this.isClickedToShowResult = true;
  }

  private getResult(): void {
    setTimeout(() => {
      this.hasResult = true;
    }, 3000);
  }
}
