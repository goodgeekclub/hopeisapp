import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-start',
  standalone: true,
  imports: [],
  templateUrl: './quiz-start.component.html',
  styleUrl: './quiz-start.component.css',
})
export class QuizStartComponent {
  showModal: boolean = false;

  constructor(private router: Router) {}

  startQuiz() {
    this.showModal = true;
  }

  confirmStart() {
    this.showModal = false;
    this.router.navigate(['/question/1']);
  }

  cancelStart() {
    this.showModal = false;
  }
}
