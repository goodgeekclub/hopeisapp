import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    controllers: [
        AuthController
    ],
    imports: [
        PassportModule.register({ defaultStrategy: 'firebase-jwt' })
    ],
    providers: [
        FirebaseAuthStrategy,
        AuthService
    ],
    exports: [
        PassportModule
    ]
})
export class AuthModule {}