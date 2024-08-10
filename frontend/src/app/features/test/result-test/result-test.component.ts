import { Component } from '@angular/core';
import { ResultComponent } from '../../quiz/result/result.component';

@Component({
  selector: 'app-result-test',
  standalone: true,
  imports: [ResultComponent],
  templateUrl: './result-test.component.html',
  styleUrl: './result-test.component.css',
})
export class ResultTestComponent {
}
