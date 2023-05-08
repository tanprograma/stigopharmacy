import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStrengthComponent } from './manage-strength.component';

describe('ManageStrengthComponent', () => {
  let component: ManageStrengthComponent;
  let fixture: ComponentFixture<ManageStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStrengthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
