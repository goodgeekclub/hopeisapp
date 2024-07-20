import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProfileService } from '../../../services/profile.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { Question, QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input()
  set id(questionId: string) {
    this.question$ = this.questionService.getQuestion(questionId);
  }

  question$!: Observable<Question>;
  currentQuestionId!: number;
  totalQuestions: number;
  selectedOption: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  getOptionSize(index: number): number {
    const sizes = [45, 35, 28, 35, 45];
    return sizes[index % sizes.length];
  }

  answerQuestion(answer: string) {
    this.profileService.saveAnswer(this.currentQuestionId, answer);
    setTimeout(() => {
      this.goToNextQuestion();
    }, 1000);
  }

  goToNextQuestion() {
    const nextQuestionId = this.currentQuestionId + 1;

    if (nextQuestionId > this.totalQuestions) {
      // this.localStorageService.clear();
      this.router.navigate(['/quiz/enter-your-name']);
    } else {
      this.profileService.setCurrentQuestionId(nextQuestionId);
      this.selectedOption = '';
      this.router.navigate(['/quiz/question', nextQuestionId]);
    }
  }
}
