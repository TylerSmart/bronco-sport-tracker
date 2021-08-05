import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSectionComponent } from './vehicle-section.component';

describe('VehicleSectionComponent', () => {
  let component: VehicleSectionComponent;
  let fixture: ComponentFixture<VehicleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
