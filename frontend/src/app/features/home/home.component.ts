import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services';
import { User } from '../../models/user.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule, CommonModule, NgOptimizedImage, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  public user: User = {
    displayName: '',
    email: '',
    token: '',
  };

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {}

  public async register(): Promise<User> {
    const user = await this.authService.register();
    this.user = user;
    console.log(this.user);
    return user;
  }
}
