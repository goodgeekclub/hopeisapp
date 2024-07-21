import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MongooseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.name.toString().includes('MongoServerError')) {
          return throwError(
            () => new BadRequestException(err.errorResponse.errmsg),
          );
        }
        return next.handle();
      }),
    );
  }
}
