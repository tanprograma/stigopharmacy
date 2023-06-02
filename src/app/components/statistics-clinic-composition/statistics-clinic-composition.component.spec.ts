import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsClinicCompositionComponent } from './statistics-clinic-composition.component';

describe('StatisticsClinicCompositionComponent', () => {
  let component: StatisticsClinicCompositionComponent;
  let fixture: ComponentFixture<StatisticsClinicCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsClinicCompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsClinicCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
