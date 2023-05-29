import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsScompositionComponent } from './statistics-scomposition.component';

describe('StatisticsScompositionComponent', () => {
  let component: StatisticsScompositionComponent;
  let fixture: ComponentFixture<StatisticsScompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsScompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsScompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
