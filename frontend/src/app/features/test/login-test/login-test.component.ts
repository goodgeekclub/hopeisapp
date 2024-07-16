import { Component } from '@angular/core';
import { AuthService } from '../../../services';
import { User } from 'firebase/auth';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login-test',
  standalone: true,
  imports: [SharedModule, CommonModule, NgOptimizedImage],
  templateUrl: './login-test.component.html',
  styleUrl: './login-test.component.css',
})
export class LoginTestComponent {
  public user?: User;

  constructor(private readonly authService: AuthService) {}

  public async register(): Promise<User | null> {
    const user = await this.authService.register();
    if (user) {
      this.user = user;
    }
    return user;
  }
}
