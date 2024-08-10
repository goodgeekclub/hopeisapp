import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionService } from '../../../services/mission.service';
import { IProfileActivities } from '../../../interfaces/mission.interface';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AdminConsoleComponent implements OnInit {
  getData: IProfileActivities | null = null;
  missions: IProfileActivities[] = []; // Initialize missions as an empty array
  index = 0;
  status = '';

  constructor(private missionService: MissionService) {}

  ngOnInit() {
    this.missionService
      .getMission()
      .subscribe((missions: IProfileActivities[]) => {
        this.missions = missions; // Assign the full list of missions to this.missions
        this.getData = this.missions[this.index];
      });
  }

  nextMission() {
    if (!this.getData) {
      return;
    }
    const currentMissionId = this.getData._id; // assume _id is the MongoDB document ID
    this.updateMissionStatus(currentMissionId, this.status).subscribe(() => {
      this.missionService
        .getMission()
        .subscribe((missions: IProfileActivities[]) => {
          this.missions = missions; // Assign the full list of missions to this.missions
          this.getData = this.missions[this.index];
        });
    });
  }

  updateMissionStatus(missionId: string, status: string) {
    return this.missionService.updateMissionStatus(missionId, status);
  }

  submitMission() {
    this.status = 'SUCCESS';
  }

  deniedMission() {
    this.status = 'FAILED';
  }
}
