import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueryOptions = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    return {
      limit: +query.limit,
      skip: +query.skip,
    };
  },
);
