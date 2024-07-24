import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import {
  Question,
  QuestionService,
  Choice,
} from '../../../services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selectedOption!: Choice;

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
    this.currentQuestionId = this.profileService.getCurrentQuestionId();
    this.id = this.currentQuestionId.toString();

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.currentQuestionId = +id;
            this.id = id;
            this.profileService.setCurrentQuestionId(this.currentQuestionId);
          }
          return this.question$;
        })
      )
      .subscribe();
  }

  getOptionSize(index: number): number {
    const sizes = [22, 28, 32, 38, 45];
    return sizes[index % sizes.length];
  }

  async answerQuestion(answer: Choice) {
    await this.profileService.saveAnswer(this.currentQuestionId, answer.title);
    setTimeout(() => {
      this.goToNextQuestion();
    }, 1000);
  }

  goToNextQuestion() {
    const nextQuestionId = this.currentQuestionId + 1;

    if (this.currentQuestionId === this.totalQuestions) {
      const highestScoreType = this.profileService.getHighestScoreType();
      if (highestScoreType) {
        console.log(
          `Highest Score Type: ${highestScoreType.type}, Score: ${highestScoreType.score}`
        );
      }
      // this.logTotalScores();
      // this.localStorageService.clear();
      // this.router.navigate(['/quiz/enter-your-name']);
    } else {
      this.profileService.setCurrentQuestionId(nextQuestionId);
      this.selectedOption = { title: '', score: 0, type: '' };
      this.router.navigate(['/quiz/question', nextQuestionId]);
    }
  }

  logTotalScores(): void {
    const scores = this.profileService.getScores();
    console.log('Total Scores by Type:', scores);
  }
}
