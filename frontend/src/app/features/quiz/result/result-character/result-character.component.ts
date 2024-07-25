import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-result-character',
  standalone: true,
  imports: [SharedModule, CommonModule, SvgIconComponent],
  templateUrl: './result-character.component.html',
  styleUrl: './result-character.component.css'
})
export class ResultCharacterComponent {

}
