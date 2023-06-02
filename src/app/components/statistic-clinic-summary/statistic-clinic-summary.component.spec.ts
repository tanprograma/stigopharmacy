import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticClinicSummaryComponent } from './statistic-clinic-summary.component';

describe('StatisticClinicSummaryComponent', () => {
  let component: StatisticClinicSummaryComponent;
  let fixture: ComponentFixture<StatisticClinicSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticClinicSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticClinicSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
