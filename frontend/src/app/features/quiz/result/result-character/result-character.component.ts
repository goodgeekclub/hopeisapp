import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../../../interfaces/character.interface';
import { Stats } from '../../../../interfaces/stats.interface';

interface CharacterPreset {
  backgroundColor: string[],
  chipColor: string,
  buttonColor: string,
  nameColor: string,
}
// export interface CharacterDisplay {
//   natures: string[];
//   ability: string;
//   photoUrl: string;
//   title: string;
//   description: string;
//   quote: string;
//   detail: string;
// }

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
  styleUrls: ['./result-character.component.css'],
})
export class ResultCharacterComponent implements OnInit {
  displayName = '';
  character?: Character;
  isLoading = true;
  totalPlayer = 0;
  preset = this.getPreset();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // console.log('Data:', this.route.snapshot.data);
    if (!this.route.snapshot.data['quizResult']) {
      this.router.navigate(['/notfound']);
    }
    const quizResult = this.route.snapshot.data['quizResult'];
    const stats: Stats = this.route.snapshot.data['stats'];
    this.preset = this.getPreset(quizResult.character.name);
    this.character = quizResult.character;
    this.displayName = quizResult.displayName;
    this.totalPlayer = stats.totalResult;
    this.isLoading = false;
  }

  private getPreset(name?: string): CharacterPreset {
    const presets: Record<string, CharacterPreset> = {
      brave: {
        backgroundColor: ['bg-redupbg', 'bg-reddownbg'],
        chipColor: 'bg-[#eb4d3d]',
        buttonColor: 'text-[#b06257]',
        nameColor: 'text-[#ECB0A7]',
      },
      wisdom: {
        backgroundColor: ['bg-purpleupbg', 'bg-purpledownbg'],
        chipColor: 'bg-[#b491d9]',
        buttonColor: 'text-[#80629f]',
        nameColor: 'text-[#E2D4F3]',
      },
      planful: {
        backgroundColor: ['bg-blueupbg', 'bg-bluedownbg'],
        chipColor: 'bg-[#355dbd]',
        buttonColor: 'bg-[#ffd76b]',
        nameColor: 'text-[#bf9537]',
      },
      harmonious: {
        backgroundColor: ['bg-yellowupbg', 'bg-yellowdownbg'],
        chipColor: 'bg-[#ffd76b]',
        buttonColor: 'text-[#bf9537]',
        nameColor: 'text-[#FEFCA9]',
      },
      sincere: {
        backgroundColor: ['bg-greenupbg', 'bg-greendownbg'],
        chipColor: 'bg-[#50eac6]',
        buttonColor: 'text-[#50a190]',
        nameColor: 'text-[#C2FDEE]',
      },
      esthetician: {
        backgroundColor: ['bg-orangeupbg', 'bg-orangedownbg'],
        chipColor: 'bg-[#ef8923]',
        buttonColor: 'text-[#bc8b4e]',
        nameColor: 'text-[#FAECBE]',
      }
    }
    if (name && presets.hasOwnProperty(name)) {
      return presets[name];
    } else {
      return {
        backgroundColor: ['text-white', 'text-white'],
        chipColor: 'text-white',
        buttonColor: 'text-black',
        nameColor: 'text-white'
      }
    }
  }
}
