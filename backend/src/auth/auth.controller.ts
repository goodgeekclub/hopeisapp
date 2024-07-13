import { Controller, Get, Req, UseGuards } from "@nestjs/common";

import { AuthGuard } from "src/firebase/guards/auth.guard";
import { FirebaseAuthStrategy } from "./strategies/firebase.strategy";
import { Anonymous, FirebaseJwtAccessTokenAuthGuard } from "./strategies/firebase-auth.guard";

@Controller("auth")
export class AuthController {
    constructor() {}
    @Get("test-login")
    testLogin() {
        return "Login test successful";
    }
    
    // @UseGuards(FirebaseJwtAccessTokenAuthGuard)
    @Anonymous()
    @Get('auth-test')
    getAuth(@Req() req: any): void {
      // user info can get by `req.user`
      console.log(req.user); 
    }
}