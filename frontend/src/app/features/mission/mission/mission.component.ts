import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [SharedModule, SvgIconComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css'
})
export class MissionComponent {

}
