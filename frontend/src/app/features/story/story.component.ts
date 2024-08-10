import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SvgIconComponent } from 'angular-svg-icon';
import { StoryTextComponent } from './storytext.component';
import { RouterModule, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SvgIconComponent,
    StoryTextComponent,
    RouterModule,
  ],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css',
})
export class StoryComponent {
  name = 'hazamashoken';
  currentPage = 1;

  textIndex = 0;

  startContent: string[] = [
    'สวัสดี',
    'ถ้าพร้อมแล้ว',
    'ออกไปตามหา',
    'แสงแห่งความหวังกัน',
  ];

  endContent: string[] = [
    'มาตามหาแสงแห่งความหวัง',
    'แบบฉบับของตัวเองกัน',
    'ต่อไป',
  ];

  textContents: string[][] = [
    ['สวัสดี', 'ถ้าพร้อมแล้ว', 'ออกไปตามหา', 'แสงแห่งความหวังกัน'],
    ['ตอนนี้เรากำลังล่องลอย', 'อยู่ในอวกาศ', 'ที่แสนว่างเปล่าและมืดมิด'],
    [
      'มีดาวดวงหนึ่งที่ส่องสว่าง',
      'แต่ตอนนี้มืดมน',
      'และปกคลุมไปด้วยความสิ้นหวัง',
    ],
    [
      'โลกของเราที่เคยน่าอยู่',
      'ทำไมเป็นแบบนี้ไปได้นะ',
      'ถ้ามีใครสักคนที่ช่วยทำให้มันดีขึ้น',
      'ก็คงจะดี...',
    ],
    [
      'แต่เหมือนจะไม่มีใครอยู่ตรงนี้เลย',
      'งั้น...',
      'เราต้องเริ่มจากตัวเองแล้วล่ะ',
    ],
    [
      'ไม่นานความมืดมนและสิ้นหวัง',
      'ก็มีแสงเล็ก ๆ เปล่งประกายขึ้นมา',
      'แสงแห่งความหวัง',
      'ที่จะทำให้โลกนี้ดีขึ้นนั้นเอง',
    ],
    ['มาตามหาแสงแห่งความหวัง', 'แบบฉบับของตัวเองกัน', 'ต่อไป'],
    [],
  ];

  maxPages = 7;

  animationPage = 8;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {
    this.textIndex = 1;
    this.getResult();
  }

  // ngOnInit() {
  //   this.getResult();
  // }

  private getResult(): void {
    setTimeout(() => {
      const profile = this.profileService.getProfile();
      if (profile) {
        this.name = profile.user;
      }
    }, 1000);
  }

  // ngAfterViewChecked() {
  //   console.log(
  //     this.textIndex === this.textContents[this.currentPage - 1].length
  //   );
  //   console.log(
  //     this.currentPage === 3 &&
  //       this.textIndex !== this.textContents[this.currentPage - 1].length
  //   );
  //   console.log(this.currentPage);
  //   console.log(this.textIndex);
  //   console.log(this.textContents[this.currentPage - 1].length);
  // }

  revealNextLine() {
    if (this.textIndex < this.textContents[this.currentPage - 1].length) {
      // this.textIndex++;
      this.nextPage();
    } else {
      if (this.currentPage >= this.maxPages) {
        return;
      }
      if (this.currentPage < this.textContents.length) {
        this.currentPage++;
        this.textIndex = 0;
      }
    }
  }

  nextPage() {
    if (this.textIndex < this.textContents[this.currentPage - 1].length) {
      this.textIndex = this.textContents[this.currentPage - 1].length;
    } else {
      if (this.currentPage < this.textContents.length) {
        this.currentPage++;
        this.textIndex = this.textContents[this.currentPage - 1].length;
      }
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.textIndex = this.textContents[this.currentPage - 1].length;
    }
  }

  skip() {
    // Handle skip logic here
    this.currentPage = this.maxPages;
    this.textIndex = this.textContents[this.currentPage - 1].length;
  }

  startAnimation() {
    this.currentPage = this.maxPages + 1;
    setTimeout(() => {
      this.router.navigate(['/quiz/start']);
    }, 4000);
  }
}
