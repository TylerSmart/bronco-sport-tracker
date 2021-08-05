import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './services/vehicle/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bronco-sport-tracker';

  public vehicles = this.vehicleService.vehicles;

  smallLayout = false;

  constructor(
    private vehicleService: VehicleService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Handset])
      .subscribe((data) => (this.smallLayout = data.matches));
  }
}
