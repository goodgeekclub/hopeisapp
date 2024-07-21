import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SocialShareComponent } from './social-share/social-share.component';

@NgModule({
  declarations: [ButtonComponent, SocialShareComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, SocialShareComponent],
})
export class SharedModule {}
