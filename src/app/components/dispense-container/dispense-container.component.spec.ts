import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseContainerComponent } from './dispense-container.component';

describe('DispenseContainerComponent', () => {
  let component: DispenseContainerComponent;
  let fixture: ComponentFixture<DispenseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispenseContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispenseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
