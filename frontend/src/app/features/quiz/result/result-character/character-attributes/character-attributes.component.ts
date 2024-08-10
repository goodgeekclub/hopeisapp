import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { isThisColorDark } from '../../../../../utils/light-or-dark.util';

@Component({
  selector: 'app-character-attributes',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './character-attributes.component.html',
  styleUrl: './character-attributes.component.css',
})
export class CharacterAttributesComponent implements OnInit {
  @Input({ required: true }) public characterAttributes?: string[] = [];
  @Input({ required: true }) public color?: string = '';

  public colorClass = '';
  public characterAttributeClass = 'text-black';

  ngOnInit(): void {
    if (isThisColorDark(this.color?.replace('bg-[', '').replace(']', '') || '#ffffff')) {
      this.characterAttributeClass = 'text-white';
    }
  }
}
