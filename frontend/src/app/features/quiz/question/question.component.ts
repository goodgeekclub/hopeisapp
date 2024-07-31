import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileService } from '../../../services/profile.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import {
  Question,
  QuestionService,
  Choice,
} from '../../../services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  question$!: Observable<Question>;
  currentQuestionId!: number;
  totalQuestions!: number;
  selectedOption!: Choice;
  isDisabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private questionService: QuestionService
  ) {}

  @Input()
  set id(questionId: string) {
    this.question$ = this.questionService.getQuestion(questionId);
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
            return this.questionService.getTotalQuestions();
          } else {
            throw new Error('Question ID is missing in the route parameters.');
          }
        })
      )
      .subscribe((total) => {
        this.totalQuestions = total;
      });
  }

  getOptionColor(index: number): string {
    const colors = ['#FAA425', '#FCC563', '#8A8A8A', '#1C3462', '#1F4789'];
    return colors[index % colors.length];
  }

  getOptionSize(index: number): number {
    const sizes = [22, 28, 32, 39, 45];
    return sizes[index % sizes.length];
  }

  async answerQuestion(answer: Choice) {
    await this.profileService.saveAnswer(this.currentQuestionId, answer.title);
    this.isDisabled = true;

    setTimeout(() => {
      this.goToNextQuestion();
      this.isDisabled = false;
    }, 800);
  }

  goToNextQuestion() {
    const nextQuestionId = this.currentQuestionId + 1;

    if (this.currentQuestionId === this.totalQuestions) {
      // this.logTotalScores();
      // this.logHighTypeScore();

      this.router.navigate(['/quiz/result']);
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

  logHighTypeScore(): void {
    const type = this.profileService.getHighestScoreType();
    console.log('CharactorType:', type);
  }
}
