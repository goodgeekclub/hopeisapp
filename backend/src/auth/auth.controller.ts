import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { FirebaseAuthGuard } from "./strategies/firebase-auth.guard";

@Controller("auth")
export class AuthController {
    constructor() {}
    @Get("test-login")
    testLogin() {
        return "Login test successful";
    }
    @UseGuards(FirebaseAuthGuard)
    @Get('auth-test')
    getAuth(@Req() req: any): void {
      // user info can get by `req.user`
      console.log(req.user); 
    }
}