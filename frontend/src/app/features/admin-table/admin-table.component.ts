import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProfileActivities } from '../../interfaces/mission.interface';


@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
})
export class AdminTableComponent {
  activities: IProfileActivities[] | null = null;

  datas: {
    img: string;
    mission_title: string;
    status: string;
  }[] = [
    {
      img: '',
      mission_title: 'mission 1',
      status: '',
    },
  ];
}
