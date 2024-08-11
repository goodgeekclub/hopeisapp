import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { MeService } from '../../services/me.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  total_users: string = '50k+';
  total_hope_risers: string = '1000';
  //please edit below links;
  ig_link: string =
    'https://www.instagram.com/youthday_th?igsh=MXZ1dnc3N3dmY2dpdA%3D%3D&utm_source=qr';
  website_link: string = 'http/website';

  let_do_the_test_link: string = '/home';
  let_do_the_mission_link: string = '/mission';
  //share
  title: string = 'มาหาเเสงของตัวเองกันเถอะ';
  url: string = environment.domainURL;
  isToast: boolean = false;

  googleProvider: GoogleAuthProvider;

  constructor(
    private auth: Auth,
    private me: MeService,
    private router: Router
  ) {
    this.googleProvider = new GoogleAuthProvider();
  }

  ngOnInit() {
    this.total_users = this.numberToKString(50000);
    this.total_hope_risers = this.numberFormat(1000);
    this.isToast = false;
  }

  onClick() {
    if (navigator.share) {
      navigator.share({
        title: this.title,
        url: this.url,
      });
    } else {
      navigator.clipboard.writeText(this.url);
      this.isToast = true;
      setTimeout(() => {
        this.isToast = false;
      }, 2000);
    }
  }

  private numberToKString(num: number): string {
    if (num < 1000) {
      return num.toString();
    }

    const k = Math.floor(num / 1000);
    return `${k}k+`;
  }

  private numberFormat(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public signIn() {
    const user = this.auth.currentUser;
    console.log(user);
    if (user) {
      this.me.fetchProfile().subscribe({
        next: profile => {
          if (profile) {
            this.router.navigate(['/mission']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          signOut(this.auth);
          this.router.navigate(['/home']);
        },
      });
    } else {
      from(signInWithPopup(this.auth, this.googleProvider)).subscribe({
        next: () => {
          this.me.fetchProfile().subscribe({
            next: profile => {
              if (profile) {
                this.router.navigate(['/mission']);
              } else {
                signOut(this.auth);
                this.router.navigate(['/home']);
              }
            },
            error: () => {
              signOut(this.auth);
              this.router.navigate(['/home']);
            },
          });
        },
        error: err => {
          console.error(err);
        },
      });
    }
  }
}
