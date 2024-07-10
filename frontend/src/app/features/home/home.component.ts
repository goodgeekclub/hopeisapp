import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public user: User | null = null;
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.register();
  }

  private async register(): Promise<User | null> {
    const user = await this.authService.register();
    this.user = user;
    console.log(this.user);
    return user;
  }
}
