import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent implements OnInit{
  total_users = "50k+";
  total_hope_risers = "1000";
  //please edit below links;
  ig_link = "https://www.instagram.com/youthday_th?igsh=MXZ1dnc3N3dmY2dpdA%3D%3D&utm_source=qr";
  website_link = "http/website";

  let_do_the_test_link = "/home";
  let_do_the_mission_link = "/mission";
  //share
  title = "มาหาเเสงของตัวเองกันเถอะ";
  url = "http....";

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
