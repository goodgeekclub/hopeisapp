import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { User } from 'firebase/auth';
import { AuthService } from '../../services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule, CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public user?: User;

  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  public async toName(): Promise<void> {
    setTimeout(() => {
      this.router.navigate(['/quiz/enter-your-name']);
    }, 1500);
  }
}
