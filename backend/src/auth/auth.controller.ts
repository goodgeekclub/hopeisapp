import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { Anonymous } from "./strategies/firebase-auth.guard";

class SignInBody {
  token: string;
}

@Controller("auth")
export class AuthController {
    constructor() {}
    @Get("test-login")
    testLogin() {
        return "Login test successful";
    }
    
    // @UseGuards(FirebaseJwtAccessTokenAuthGuard)
    @Anonymous()
    @Post('signIn')
    getAuth(@Body() body: SignInBody): void {
      // user info can get by `req.user`
      console.log(body); 
    }
}