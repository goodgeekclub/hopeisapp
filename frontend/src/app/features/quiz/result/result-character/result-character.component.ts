import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { Character } from '../../../../interfaces/character.interface';
import { characterMockData } from '../../../../mocks/character';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

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
  @Input({ required: true }) public character: string = '';

  public characterData: Character =
    characterMockData[Math.floor(Math.random() * characterMockData.length)];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.setCharacterInfo();
  }

  private setCharacterInfo(): void {
    let characterResult = characterMockData.find((character: Character) => {
      return character.characterNameTh === this.character;
    });
    if (characterResult) {
      this.characterData = characterResult;
    }
  }

  public async signUp() {
    const user = await this.authService.register();
    if (user) {
      this.router.navigate(['/mission']);
    }
  }
}
