import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionService } from '../../../services/mission.service';
import { IProfileActivities } from '../../../interfaces/mission.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminPanelComponent implements OnInit {
  current: IProfileActivities | null = null;
  missions: IProfileActivities[] = []; // Initialize missions as an empty array
  index = 0;
  status = '';
  isNext = true;

  constructor(private missionService: MissionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.setMission(params['id']);
      } else {
        if (this.isNext) {
          this.nextMission();
        }
      }
    })
  }

  setMission(id: string) {
    this.missionService.get(id).subscribe({ next: (mission) => {
      this.current = mission;
      if (mission.status !== 'PENDING') {
        this.isNext = false;
      }
    }, error: (e) => {
      this.current!.mission.name = 'Error';
      this.current!.status = 'ERROR';
    },
  })
  }

  nextMission() {
    this.missionService.getMission('PENDING', 1)
      .subscribe((missions: IProfileActivities[]) => {
        this.current = missions[this.index];
        console.log(missions);
        if (missions.length > 0) {
          this.router.navigate(['/admin/console/panel/', this.current._id] , { replaceUrl: true })
        } else {
          this.isNext = false;
          this.router.navigate(['/admin/console/panel/'], { replaceUrl: true })
        }
      });
  }

  updateMissionStatus(missionId: string, status: string) {
    return this.missionService.updateMissionStatus(missionId, status)
  }

  submitMission() {
    if (!this.current) { return }
    return this.updateMissionStatus(this.current._id, 'SUCCESS').subscribe(res => {
      this.nextMission();
    })
  }

  deniedMission() {
    if (!this.current) { return }
    return this.updateMissionStatus(this.current._id, 'FAILED').subscribe(res => {
      this.nextMission();
    })
  }
}
