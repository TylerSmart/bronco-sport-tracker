import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
  Bronco,
  BroncoSport,
  VehicleService,
} from './services/vehicle/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bronco-sport-tracker';

  smallLayout = false;

  broncos: Bronco[] = [];
  sports: BroncoSport[] = [];

  constructor(
    private vehicleService: VehicleService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Handset])
      .subscribe((data) => (this.smallLayout = data.matches));

    this.broncos = this.vehicleService.getBroncos();
    this.sports = this.vehicleService.getSports();
  }
}
