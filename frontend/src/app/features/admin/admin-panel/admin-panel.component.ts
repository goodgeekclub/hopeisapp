import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionService } from '../../../services/mission.service';
import { IProfileActivities } from '../../../interfaces/mission.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AdminPanelComponent implements OnInit {
  current: IProfileActivities | null = null;
  missions: IProfileActivities[] = []; // Initialize missions as an empty array
  index = 0;
  status = '';

  constructor(private missionService: MissionService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.setMission(params['id']);
      } else {
        this.nextMission();
      }
    })
  }

  setMission(id: string) {
    this.missionService.get(id).subscribe({ next: (res) => {
      this.current = res;
    }, error: (e) => {
      console.log(e);
      this.current!.mission.name = 'Error';
      this.current!.status = 'ERROR';
    },
  })
  }

  nextMission() {
    this.missionService.getMission('PENDING', 1)
      .subscribe((missions: IProfileActivities[]) => {
        this.current = missions[this.index];
        if (missions.length > 0) {
          this.router.navigate(['/admin/console/panel/', this.current._id])
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
