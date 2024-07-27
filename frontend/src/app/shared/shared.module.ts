import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { BackgroundComponent } from './background/background.component';
import { SocialShareComponent } from './social-share/social-share.component';

@NgModule({
  declarations: [ButtonComponent, FooterComponent, BackgroundComponent, SocialShareComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, FooterComponent, BackgroundComponent, SocialShareComponent],
})
export class SharedModule {}
