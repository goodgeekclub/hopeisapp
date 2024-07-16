import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-name-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css'],
})
export class NameInputComponent {
  inputNameValue: string = '';

  constructor(private profileService: ProfileService, private router: Router) {}

  saveToLocalStorage() {
    if (this.inputNameValue && this.inputNameValue.trim() !== '') {
      this.profileService.createProfile(this.inputNameValue);
      this.router.navigate(['/start-quiz']);
    }
  }
}
