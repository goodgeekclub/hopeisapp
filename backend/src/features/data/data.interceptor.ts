import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { DataService } from './data.service';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class DataInterceptor implements NestInterceptor {
  constructor(private service: DataService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { params } = context.getArgByIndex(0);
    if (params && params.hasOwnProperty('id')) {
      const { id } = params;
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      return from(this.service.findOne(id)).pipe(
        switchMap((res) => {
          if (res) {
            return next.handle();
          } else {
            throw new NotFoundException('Data does not existed');
          }
        }),
      );
    }
    return next.handle();
  }
}
