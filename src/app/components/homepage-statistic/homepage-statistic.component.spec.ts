import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageStatisticComponent } from './homepage-statistic.component';

describe('HomepageStatisticComponent', () => {
  let component: HomepageStatisticComponent;
  let fixture: ComponentFixture<HomepageStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
