import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../../../interfaces/character.interface';
import { Stats } from '../../../../interfaces/stats.interface';
import { signInWithPopup, Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { MeService } from '../../../../services/me.service';
import { QuizResult } from '../../../../interfaces/quiz-result.interface';
import * as htmlToImage from 'html-to-image';
import Image from 'image-js';
import html2canvas from 'html2canvas-pro';
import { Location, LocationStrategy } from '@angular/common';
import { environment } from '../../../../../environments/environment';

interface CharacterPreset {
  backgroundColor: string[];
  chipColor: string;
  buttonColor: string;
  nameColor: string;
}

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
export class ResultCharacterComponent implements OnInit, AfterViewInit {
  @ViewChild('article') article?: ElementRef;

  displayName = '';
  characterImg?: string;
  character?: Character;
  isLoading = true;
  totalPlayer = 0;
  preset = this.getPreset();
  isToast = false;
  onSharing = false;
  shareData?: string;

  googleAuthProvider: GoogleAuthProvider;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    private me: MeService,
  ) {
    this.googleAuthProvider = new GoogleAuthProvider();
  }

  ngOnInit(): void {
    if (!this.route.snapshot.data['quizResult']) {
      this.router.navigate(['/notfound']);
    }
    const quizResult = this.route.snapshot.data['quizResult'];
    console.log('quizResult:', quizResult);
    const stats: Stats = this.route.snapshot.data['stats'];
    this.preset = this.getPreset(quizResult.character.name);
    this.character = quizResult.character;
    this.characterImg = this.character?.photoUrl;
    this.displayName = quizResult.displayName;
    this.totalPlayer = stats.totalResult;
    this.isLoading = false;
    this.characterImg = 'assets/images/characters/' + this.character?.photoUrl.split('/').pop();
  }

  async ngAfterViewInit() {}

  async onShare() {
      const blob =  await htmlToImage.toBlob(this.article?.nativeElement);
      const url = `${environment.domainURL}/${this.router.url}`
      console.log(this.router.url);
      if (navigator.share) {
        await navigator.share({
          title: 'Hope is Us: ',
          url: 'https://hopeis.us',
          text: `
            ${this.displayName} คือ 
            ${this.character?.title} ${this.character?.description}
          `,
          files: [
            new File([blob!], `${this.character?.name}.png`, { type: 'image/png'})
          ],
        });
      } else {
        navigator.clipboard.writeText(url);
        this.isToast = true;
        setTimeout(() => {
          this.isToast = false;
        }, 2000);
      }
  }

  getBase64Image(img: Image) {
    let canvas = document.createElement("canvas");
    canvas.width = img!.width;
    canvas.height = img!.height;
    var ctx = canvas.getContext("2d");
    ctx!.drawImage(img, 0, 0);
    var base64 = canvas.toDataURL("image/png");
    return base64;
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
      },
    };
    if (name && presets.hasOwnProperty(name)) {
      return presets[name];
    } else {
      return {
        backgroundColor: ['text-white', 'text-white'],
        chipColor: 'text-white',
        buttonColor: 'text-black',
        nameColor: 'text-white',
      };
    }
  }

  public async signUp() {
    const user = await signInWithPopup(this.auth, this.googleAuthProvider);
    if (user) {
      const quizResultId = this.route.snapshot.data['quizResult']._id;
      this.me.createProfile(quizResultId).subscribe({
        next: () => {
          this.router.navigate(['/mission']);
        },
        error: error => {
          if (error.status === 400) {
            this.router.navigate(['/mission']);
          }
        },
      });
    }
  }
}
