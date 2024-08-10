// resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { QuizResultService } from '../../../../services/quiz-result.service';

@Injectable({
  providedIn: 'root'
})
export class ResultCharacterResolver implements Resolve<any> {
  constructor(private quizResultService: QuizResultService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];
    return this.quizResultService.getQuizResultById(id);
  }
}