import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'firebase-jwt' })
    ],
    providers: [
        FirebaseAuthStrategy
    ],
    exports: [
        PassportModule
    ]
})
export class AuthModule {}