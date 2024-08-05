import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionService } from '../../services/mission.service';
import { Mission } from '../../interfaces/mission';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminConsole {

  getData: any;
  missions: Mission[] = [];  // Initialize missions as an empty array
  index: number = 0;
  status: string = '';

  constructor(private missionService: MissionService, private http: HttpClient) {
    this.missionService.getMission().subscribe((missions: Mission[]) => {
      this.missions = missions;  // Assign the full list of missions to this.missions
      this.getData = this.missions[this.index];
    });
  }

  

  nextMission() {
      const currentMissionId = this.getData._id; // assume _id is the MongoDB document ID
      this.updateMissionStatus(currentMissionId, this.status)
        .subscribe((updatedMission: Mission) => {
          this.getData.status = this.status;
          this.missionService.getMission().subscribe((missions: Mission[]) => {
            this.missions = missions;  // Assign the full list of missions to this.missions
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
