import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Question, QuestionService } from '../../services/question.service';
import { ProfileService } from '../../services/profile.service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input()
  set id(questionId: string) {
    this.question$ = this.service.getQuestion(questionId);
  }

  question$!: Observable<Question>;
  currentQuestionId!: number;
  totalQuestions: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: QuestionService,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private questionService: QuestionService
  ) {
    this.totalQuestions = this.questionService.getTotalQuestions();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.currentQuestionId = +id;
            this.id = id;
          }
          return this.question$;
        })
      )
      .subscribe();
  }

  answerQuestion(answer: string) {
    this.profileService.saveAnswer(this.currentQuestionId, answer);
    this.goToNextQuestion();
  }

  goToNextQuestion() {
    if (this.currentQuestionId === this.totalQuestions) {
      // this.localStorageService.clear();
      this.router.navigate(['/']);
    } else {
      const nextQuestionId = this.currentQuestionId + 1;
      this.router.navigate(['/question', nextQuestionId]);
    }
  }
}
