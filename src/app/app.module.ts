import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleSectionComponent } from './components/vehicle-section/vehicle-section.component';
import { MaterialModule } from './material/material.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [AppComponent, VehicleSectionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IvyCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
