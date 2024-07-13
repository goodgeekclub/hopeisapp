import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { QuizesService } from './quizes.service';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class QuizesInterceptor implements NestInterceptor {
  constructor(private service: QuizesService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { params } = context.getArgByIndex(0)
    if (params && params.hasOwnProperty('id')) {
      const { id } = params;
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      return from(this.service.get(id)).pipe(
        switchMap(res => {
          if (res) {
            return next.handle();
          } else {
            throw new NotFoundException('Quiz does not existed');
          }
        })
      )
    }
    return next.handle();
  }
}
