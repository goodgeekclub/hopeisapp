import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalStorageService, ProfileService } from '../../../services';

@Component({
  selector: 'app-name-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css'],
})
export class NameInputComponent implements OnInit {
  showModal: boolean = false;
  inputNameValue: string = '';

  constructor(
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.profileService.getProfile()) {
      this.showModal = true;
    }
  }

  saveToLocalStorage() {
    if (this.inputNameValue && this.inputNameValue.trim() !== '') {
      this.profileService.createProfile(this.inputNameValue);
      this.router.navigate(['/quiz/start']);
    }
  }

  resumeQuiz() {
    this.showModal = false;
    const currentQuestionId = this.profileService.getCurrentQuestionId();
    this.router.navigate(['/quiz/question', currentQuestionId]);
  }

  startNewSession() {
    this.localStorageService.clear();
    this.showModal = false;
  }
}
