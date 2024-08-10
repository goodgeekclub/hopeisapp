import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProfileActivities } from '../../../interfaces/mission.interface';
import { MissionService } from '../../../services/mission.service';


@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
})
export class AdminTableComponent implements OnInit {
  activities: IProfileActivities[] | null = null;
  noImgUrl = 'assets/images/noimage.jpg';

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.missionService
    .getMission()
    .subscribe((activities: IProfileActivities[]) => {
      console.log(activities)
      this.activities = activities;
    });
  }
}
