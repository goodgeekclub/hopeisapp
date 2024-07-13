import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { FirebaseAuthGuard } from "./strategies/firebase-auth.guard";
import { AuthGuard } from "src/firebase/guards/auth.guard";

@Controller("auth")
export class AuthController {
    constructor() {}
    @Get("test-login")
    testLogin() {
        return "Login test successful";
    }
    
    @Get('auth-test')
    getAuth(@Req() req: any): void {
      // user info can get by `req.user`
      console.log(req.user); 
    }
}