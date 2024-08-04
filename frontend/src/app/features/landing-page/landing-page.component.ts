import { Component, Input } from '@angular/core';

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
  ig_link : string = "http://ig";
  website_link : string = "http/website";
  mission_link : string = "";
  let_do_the_test_link : string = "";
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
      ).then(() => {
        console.log("hello world");
      })
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
