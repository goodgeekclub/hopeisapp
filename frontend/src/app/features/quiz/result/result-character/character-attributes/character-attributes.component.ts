import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-attributes',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './character-attributes.component.html',
  styleUrl: './character-attributes.component.css',
})
export class CharacterAttributesComponent implements OnInit {
  @Input() public characterAttributes!: string[];
  @Input() public color!: string;

  public colorClass = '';

  ngOnInit(): void {}
}
