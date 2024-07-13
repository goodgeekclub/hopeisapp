import {ExecutionContext, Injectable, SetMetadata, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from "@nestjs/graphql";

export const ANONYMOUS_KEY = 'anonymous';
export const Anonymous = () => {
    return SetMetadata(ANONYMOUS_KEY, true)
};
@Injectable()
export class FirebaseJwtAccessTokenAuthGuard extends AuthGuard('firebase-jwt') {

    constructor(
        private reflector: Reflector,
    ) {
        super();
    }

    getRequest(context: ExecutionContext) {
        // Seq 2.
        // https://stackoverflow.com/questions/70644923/nestjs-passport-typeerror-cannot-read-properties-of-undefined-reading-logi
        // transform the ExecutionContext from Graphql to one Nestjs/Passport can read
        // this.logger.debug(`context: ${context}`);
        const ctx = GqlExecutionContext.create(context);
        console.log(ctx.getContext().req);
        return ctx.getContext().req;
    }

    canActivate(context: ExecutionContext) {
        // Seq 1.
        const isAnonymous = this.reflector.getAllAndOverride<boolean>(ANONYMOUS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isAnonymous) {
            return true;
        }
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }
    // canActivate(context: ExecutionContext): boolean {
    //     const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    //     if (!roles) {
    //       return true;
    //     }
    //     const request = context.switchToHttp().getRequest();
    //     const user = request.user;
    //     return matchRoles(roles, user.role);
    // }

    // handleRequest(err, user, info) {
    //     // You can throw an exception based on either "info" or "err" arguments
    //     // Seq 4.
    //     if (err || !user) {
    //         throw err || new UnauthorizedException();
    //     }
    //     return user;
    // }
}