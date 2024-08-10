import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit {
  imgUrl?: string;
  constructor() {}

  ngOnInit() {
    const char = this.getRanChars();
    this.imgUrl = `${environment.assetURL}/assets/notfound/${char}-notfound.png`;
  }

  getRanChars() {
    const characters = [
      'brave',
      'esthetician',
      'harmonious',
      'planful',
      'sincere',
      'wisdom',
    ];
    return characters[Math.floor(Math.random() * characters.length)];
  }
}
