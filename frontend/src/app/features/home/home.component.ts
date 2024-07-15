import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule, CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
}
