import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { AuthService } from './services';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, SvgIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserState().subscribe(async (user) => {
      if (!environment.production) {
        console.log(user);
        console.log('accessToken', await user.getIdToken());
      }
    });
  }
}
