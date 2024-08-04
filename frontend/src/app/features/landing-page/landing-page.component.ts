import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  total_users : string = "50k+";
  total_hope_risers : string = "1000";
  //please edit below links;
  share_link : string = "https://www.google.com";
  ig_link : string = "http://ig";
  website_link : string = "http/website";
  goodgeek_link : string = "http/gg";
  youth_link : string = "http/youth_link";
  mission_link : string = "";
  
  ngOnInit () {
    this.total_users = this.numberToKString(50000);
    this.total_hope_risers = this.numberFormat(1000);
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
