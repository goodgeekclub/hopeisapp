import { Component, ViewChild, type ElementRef } from '@angular/core';
import html2canvas from 'html2canvas-pro';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
/**
 * NOTE: Web Share API is not supported in all browsers.
 * Check the compatibility here: https://caniuse.com/web-share
 *
 * This component will share the content of the element with the id 'toBeShare'.
 *
 * This requires file to be pre generated and stored in the file variable before calling the onClick method.
 *
 * NOTE: Regarding Web Share API, the share method is only available in secure contexts (HTTPS) or localhost when dev.
 * Mobile devices will have different behavior when sharing files but most support natively.
 * The shareData requires a title, text minimally to be shared.
 *
 * NOTE: use web api share:
 * it must be called from a user gesture event handler
 * it will fail if
 *
 * to use this feature in other component.
 * 1. Copy everything but check() from this file to the component you want to use.
 * 2. Add the #toBeShare to the element you want to share.
 */
@Component({
  selector: 'app-social-share-button',
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.css',
})
export class SocialShareComponent implements AfterViewInit {
  @ViewChild('toBeShare') toBeShare?: ElementRef;

  file: File | null = null;
  isBrowser: boolean;
  clicked = false;

  title = 'YouthTalk_Hope_is';
  text = 'character.title';

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onClick() {
    if (this.file) {
      const shareData = {
        title: this.title,
        text: this.text,
        files: [this.file],
      };

      // Check if Web Share API is supported
      console.log(navigator.canShare(shareData));
      if (navigator.canShare(shareData)) {
        // Share the file
        navigator.share(shareData);
      } else {
        // Fallback to clipboard
        this.clicked = true;
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': this.file!,
          }),
        ]);
        setTimeout(() => {
          this.clicked = false;
        }, 1500);
      }
    }
  }

  check() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 3000);
    console.log(this.file);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      html2canvas(this.toBeShare?.nativeElement).then(async canvas => {
        const blob = await new Promise<Blob | null>(resolve =>
          canvas.toBlob(resolve, 'image/png')
        );
        const fileName = 'hope-is-' + new Date().getTime() + '.png';
        this.file = new File([blob!], fileName, {
          type: 'image/png',
        });
      });
    }
  }
}
