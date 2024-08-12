import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MeService } from '../../../services/me.service';
import { signOut, Auth } from '@angular/fire/auth';
import type { Stats } from '../../../interfaces/stats.interface';
import { DateTime } from 'luxon';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { MissionMoonComponent, MoonStats } from './mission-moon/mission-moon.component';

type MissionType = 'noMission' | 'getMission' | 'showMission' | 'uploadMission' | 'pendingMission' | 'finishMission';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, SharedModule, SvgIconComponent, RouterModule, MissionMoonComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css',
})
export class MissionComponent implements OnInit {
  loading = false;
  coins = 0;
  totalCoins = 0;
  totalMember = 0;
  moonStats: MoonStats = {
    totalCoins: 0,
    coins: 0,
    totalMember: 0,
  }

  missionType: MissionType = 'getMission';

  missionId = 'hello';
  missionImgUrl = '/images/mission/rocket.png';
  missionTitle = 'Mission 1';
  missionTime = 0;

  testindex = 0;

  displayName = '';

  file: File | null = null;
  fileSrc = '';

  constructor(
    private router: Router,
    private me: MeService,
    private readonly auth: Auth,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const stats: Stats = this.route.snapshot.data['stats'];
    this.totalCoins = stats.totalCoin;
    this.totalMember = stats.totalResult;
    this.moonStats.totalCoins = stats.totalCoin;
    this.moonStats.totalMember = stats.totalResult;

    this.me.fetchProfile().subscribe(res => {
      this.displayName = res.displayName;
    });
    this.me.getMissionStats().subscribe(res => {
      this.coins = res.coin;
      this.moonStats.coins = res.coin;
    })
    this.me.getMission().subscribe(res => {
      if (res.length === 0) {
        return;
      }
      const activity = res[0];
      console.log(activity)
      this.missionId = activity._id;
      this.missionTitle = activity.mission.description;
      if (activity.status === 'DOING') {
        this.missionImgUrl = activity.mission.photoUrl;
        this.missionType = 'showMission';
      } else if (activity.status === 'PENDING') {
        this.missionImgUrl = activity.photoUrl;
        this.missionType = 'pendingMission';
      } else if (activity.status === 'SUCCESS') {
        this.missionImgUrl = activity.photoUrl;
        this.missionType = 'finishMission';
      }
      this.missionTime = this.calculateHourLeft();
      this.missionType = 'getMission' // test
    });
  }

  private calculateHourLeft() {
    return Math.floor(DateTime.now().endOf('day').diffNow().as('hour'));
  }

  public getMission() {
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
    if (!this.file) {
      return;
    }
    this.loading = true;
    this.me.uploadMission(this.missionId, this.file!).subscribe(() => {
      this.missionType = 'pendingMission';
      this.loading = false;
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

  public signOut() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    });
  }
}
