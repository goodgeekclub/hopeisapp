import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from "@angular/core";
import { SharedModule } from "../../../../shared/shared.module";
import { Stats } from "../../../../interfaces/stats.interface";

export interface MoonStats {
  coins: number;
  totalCoins: number;
  totalMember: number;
}

@Component({
  selector: 'app-mission-moon',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './mission-moon.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MissionMoonComponent implements OnInit {
  @Input() stats: MoonStats = {
    coins: 0,
    totalCoins: 0,
    totalMember: 0
  };
  constructor() {}

  ngOnInit(): void {
  }

  public goToExplore() {
    console.log('go to explore');
    // this.router.navigate(['/explore']);
  }
}