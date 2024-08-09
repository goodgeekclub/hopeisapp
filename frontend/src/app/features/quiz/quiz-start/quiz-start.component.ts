import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { ProfileService } from '../../../services/profile.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { Question, QuestionService } from '../../../services/question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css'],
})
export class QuizStartComponent implements OnInit {
  @Input()
  set id(questionId: string) {
    this.question$ = this.questionService.getQuestion(questionId);
  }

  question$!: Observable<Question>;
  showModal = false;
  currentQuestionId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private questionService: QuestionService,
  ) {}

  ngOnInit() {
    this.currentQuestionId = this.profileService.getCurrentQuestionId() || 1;

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.currentQuestionId = +id;
            this.profileService.setCurrentQuestionId(this.currentQuestionId);
          }
          this.id = this.currentQuestionId.toString();
          return this.question$;
        }),
      )
      .subscribe();
  }

  startQuiz() {
    this.router.navigate(['/quiz/question', this.currentQuestionId]);
  }
}
