import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Router } from '@angular/router';
import { MeService } from '../../../services/me.service';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, SharedModule, SvgIconComponent, RouterModule],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css',
})
export class MissionComponent {
  coins = '1,000';
  totalCoins = '0';
  totalMember = '0';

  missionType = 'getMission';

  missionId = 'hello';
  missionImgUrl = '/images/mission/rocket.png';
  missionTitle = 'Mission 1';
  missionTime = '1';

  testindex = 0;

  file: File | null = null;
  fileSrc = '';

  constructor(
    private router: Router,
    private me: MeService
  ) {
    this.me.getMission().subscribe(res => {
      if (res.length === 0) {
        return;
      }
      this.missionId = res[0]._id;
      this.missionTitle = res[0].mission.description;
      this.missionImgUrl = res[0].mission.photoUrl;
      this.missionType = 'showMission';
    });
    this.missionTime = this.calculateHourLeft();
  }

  private calculateHourLeft() {
    // calculate hour left til the end of the day
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const diff = end.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60)).toString();
  }

  ngOnInit() {
    this.coins = this.numberFormat(1000);
    this.totalCoins = this.numberFormat(1000000);
    this.totalMember = this.numberFormat(1000000);
    this.missionType = 'getMission';
    this.missionTitle = 'Mission 1  aerh aerh aerh aerha erha er';
    this.missionTime = '1';
  }

  private numberFormat(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public getMission() {
    console.log('get mission');
    this.me.createDailyMission().subscribe({
      next: res => {
        this.missionId = res._id;
        this.missionTitle = res.mission.name;
        this.missionImgUrl = res.mission.photoUrl;
        this.missionType = 'showMission';
        this.missionTime = this.calculateHourLeft();
      },
      error: err => {
        if (err.error.status === 404) {
          this.missionType = 'noMission';
        }
      },
    });
  }
  public goToExplore() {
    console.log('go to explore');
    // this.router.navigate(['/explore']);
  }
  public openMenu() {
    this.missionType = 'getMission';
    console.log('go to explore');
  }

  public sendMission() {
    this.missionType = 'uploadMission';
  }

  public uploadMission() {
    console.log('upload mission');
    // this.missionType = 'finishMission';
    if (!this.file) {
      return;
    }
    this.me.uploadMission(this.missionId, this.file!).subscribe(() => {
      this.missionType = 'finishMission';
    });
  }

  public closeMission() {
    this.missionType = 'noMission';
  }

  public handleFileInput(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileSrc = URL.createObjectURL(file);
    }
  }
}
