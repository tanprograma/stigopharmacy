import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDispenseComponent } from './admin-dispense.component';

describe('AdminDispenseComponent', () => {
  let component: AdminDispenseComponent;
  let fixture: ComponentFixture<AdminDispenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDispenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
