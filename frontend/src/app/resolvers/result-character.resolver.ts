// resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { QuizResultService } from '../services/quiz-result.service';
import { QuizResult } from '../interfaces/quiz-result.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultCharacterResolver implements Resolve<QuizResult | null> {
  constructor(private quizResultService: QuizResultService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuizResult | null> | QuizResult {
    const id = route.params['id'];
    return this.quizResultService.getQuizResultById(id).pipe(
      catchError((e: any) => {
        // console.log('ResultCharacterResolverError:', e);
        return of(null);
      })
    );
  }
}