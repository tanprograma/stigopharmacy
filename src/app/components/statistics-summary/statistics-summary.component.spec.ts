import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSummaryComponent } from './statistics-summary.component';

describe('StatisticsSummaryComponent', () => {
  let component: StatisticsSummaryComponent;
  let fixture: ComponentFixture<StatisticsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
