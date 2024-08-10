import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { Stats } from "../interfaces/stats.interface";
import { DataService } from "../services/data.service";
import { Data } from "../interfaces/data.interface";

@Injectable({ providedIn: 'root' })
export class StatsResolver implements Resolve<Stats> {
  constructor(private dataService: DataService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Stats> | Stats {
    return this.dataService.getStats().pipe(
      map((data: Data<Stats>) => data.data)
    );
  }
}