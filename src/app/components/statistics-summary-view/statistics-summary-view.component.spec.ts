import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSummaryViewComponent } from './statistics-summary-view.component';

describe('StatisticsSummaryViewComponent', () => {
  let component: StatisticsSummaryViewComponent;
  let fixture: ComponentFixture<StatisticsSummaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsSummaryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
