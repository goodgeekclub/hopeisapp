import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, SharedModule, SvgIconComponent, RouterModule],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css',
})
export class MissionComponent {
  coins: string = '1,000';
  totalCoins: string = '0';
  totalMember: string = '0';

  missionType: string = 'getMission';

  missionImgUrl = '/images/mission/rocket.png';
  missionTitle = 'Mission 1';
  missionTime: string = '1';

  testindex: number = 0;

  file: File | null = null;
  fileSrc: string = '';

  constructor(private router: Router) {}

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
    this.missionType = 'showMission';
    console.log('get mission');
    // this.router.navigate(['/explore']);
  }
  public goToExplore() {
    console.log('go to explore');
    // this.router.navigate(['/explore']);
  }
  public openMenu() {
    this.missionType = 'getMission';
    console.log('go to explore');
    // this.router.navigate(['/explore']);
  }

  public sendMission() {
    this.missionType = 'uploadMission';
  }

  public uploadMission() {
    console.log('upload mission');
    this.missionType = 'finishMission';
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
