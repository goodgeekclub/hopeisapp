import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { Character } from '../../../../Enum/Character';
import { ICharacter } from '../../../../Types/Character';
import { characterMockData } from '../../../../Constants/character';



@Component({
  selector: 'app-result-character',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SvgIconComponent,
    CharacterAttributesComponent,
  ],
  templateUrl: './result-character.component.html',
  styleUrl: './result-character.component.css',
})
export class ResultCharacterComponent {
  @Input() public character!: Character;

  public characterData: ICharacter =
    characterMockData[Math.floor(Math.random() * characterMockData.length)];

  ngOnInit(): void {
    this.setCharacterInfo();
  }

  private setCharacterInfo(): void {
    let characterResult = characterMockData.find((character: ICharacter) => {
      character.characterNameEn === this.character;
    });
    if (characterResult) {
      this.characterData = characterResult;
    }
  }
}
