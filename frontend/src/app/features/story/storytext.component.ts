// page.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'story-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center">
      <ng-container *ngFor="let text of texts; let i = index">
        <p
          class="p-1 text-lg transition-opacity duration-500 ease-in-out delay-150 opacity-0"
          [ngClass]="{
            'opacity-0 invisible': !(textIndex > i),
            'opacity-100 visible': textIndex > i,
          }"
        >
          {{ text }}
        </p>
      </ng-container>
    </div>
  `,
})
export class StoryTextComponent {
  @Input() texts: string[] = [];
  @Input() textIndex = 0;

  @Input() currentPage = 0;
}
