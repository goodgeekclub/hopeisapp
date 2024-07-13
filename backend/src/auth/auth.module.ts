import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'firebase-jwt' })
    ],
    providers: [
        FirebaseAuthStrategy
    ],
    exports: [
        PassportModule
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {}