import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent {
  total_users : string = "50k+";
  total_hope_risers : string = "1000";
  //please edit below links;
  ig_link : string = "https://www.instagram.com/youthday_th?igsh=MXZ1dnc3N3dmY2dpdA%3D%3D&utm_source=qr";
  website_link : string = "http/website";

  let_do_the_test_link : string = "/home";
  let_do_the_mission_link : string = "/mission";
  //share
  title : string = "มาหาเเสงของตัวเองกันเถอะ";
  url : string = "http....";

  ngOnInit () {
    this.total_users = this.numberToKString(50000);
    this.total_hope_risers = this.numberFormat(1000);
  }

  onClick() {
    if ( navigator.share ) {
      navigator.share(
        {
          title : this.title,
          url : this.url
        }
      )
    } else {
      navigator.clipboard.writeText(this.url);
      alert("copied url: " + this.url );
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
}
