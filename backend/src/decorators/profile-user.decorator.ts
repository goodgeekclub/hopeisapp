import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProfileUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { profile } = request;
    return profile;
  },
);
