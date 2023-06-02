import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsClinicViewComponent } from './statistics-clinic-view.component';

describe('StatisticsClinicViewComponent', () => {
  let component: StatisticsClinicViewComponent;
  let fixture: ComponentFixture<StatisticsClinicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsClinicViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsClinicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
