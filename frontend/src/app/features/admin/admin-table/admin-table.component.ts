import { routes } from './../../../app.routes';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProfileActivities } from '../../../interfaces/mission.interface';
import { MissionService } from '../../../services/mission.service';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private route: ActivatedRoute, private missionService: MissionService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const status = query['status'];
      this.missionService.getMission(status, 100)
        .subscribe((activities: IProfileActivities[]) => {
          console.log(activities)
          this.activities = activities;
        });
    });
  }

  setStatus(status?: string) {
    if (!status) {
      this.router.navigate([])
    } else if (status === 'ACTIVE') {
      status = 'DOING,PENDING'
    } else if (status === 'FINISH') {
      status = 'SUCCESS,FAILED'
    }
    this.router.navigate([], { queryParams: {status}, queryParamsHandling: 'merge' })
  }
}
