import { Component, ViewChild, type ElementRef } from '@angular/core';
import html2canvas from 'html2canvas-pro';

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
 *
 * NOTE: use web api share:
 * it must be called from a user gesture event handler
 * it will fail if
 */
@Component({
  selector: 'social-share-button',
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.css',
})
export class SocialShareComponent {
  @ViewChild('toBeShare') toBeShare?: ElementRef;

  @ViewChild('dynamicElementsContainer', { static: false })
  file: File | null = null;
  dynamicElementsContainer?: ElementRef;

  onClick() {
    console.log(this.file);
    if (this.file) {
      const shareData = {
        title: 'Check this out!',
        text: 'Here is an image to share.',
        files: [this.file],
      };

      if (navigator.canShare(shareData)) {
        navigator.share(shareData);
      }
    }
  }

  addDynamicElement() {
    html2canvas(this.toBeShare?.nativeElement).then(async (canvas) => {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      this.file = new File([blob!], 'share-image.png', {
        type: 'image/png',
      });
    });
  }
}
