import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from "./auth.controller";
import { FirebaseStrategy } from "./strategies/firebase.strategy";

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [FirebaseStrategy],
    exports: []
})
export class AuthModule {}