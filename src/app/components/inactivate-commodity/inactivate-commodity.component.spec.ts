import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivateCommodityComponent } from './inactivate-commodity.component';

describe('InactivateCommodityComponent', () => {
  let component: InactivateCommodityComponent;
  let fixture: ComponentFixture<InactivateCommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivateCommodityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivateCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
