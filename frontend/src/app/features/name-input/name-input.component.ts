import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css'],
})
export class NameInputComponent {
  inputNameValue: string = '';

  constructor(private storageService: StorageService, private router: Router) {}

  saveToLocalStorage() {
    this.storageService.set('userName', this.inputNameValue);
    // this.storageService.clear();
    // this.router.navigate(['/']);
  }
}
