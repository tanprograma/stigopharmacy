import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStockPrescriptionComponent } from './manage-stock-prescription.component';

describe('ManageStockPrescriptionComponent', () => {
  let component: ManageStockPrescriptionComponent;
  let fixture: ComponentFixture<ManageStockPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStockPrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStockPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
