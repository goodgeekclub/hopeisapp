import { Component, Input } from '@angular/core';

export interface Share {
  title?: string;
  text?: string;
  url?: string;
}

interface ExtendNavigator extends Navigator {
  share: (share: Share) => Promise<void>;
}

interface ExtendWindow extends Window {
  navigator: ExtendNavigator;
}

declare var window: ExtendWindow;

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.css'
})

export class SocialShareComponent {
  @Input() share?: Share;

  onClick() {
    // if (window.navigator.canShare(this.share)) {
      console.log(window.navigator);
      window.navigator.share(this.share!);
    // }
  } 
}
