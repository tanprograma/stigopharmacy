import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticFormClinicComponent } from './statistic-form-clinic.component';

describe('StatisticFormClinicComponent', () => {
  let component: StatisticFormClinicComponent;
  let fixture: ComponentFixture<StatisticFormClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticFormClinicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticFormClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
