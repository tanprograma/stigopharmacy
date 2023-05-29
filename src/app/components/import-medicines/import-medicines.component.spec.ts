import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMedicinesComponent } from './import-medicines.component';

describe('ImportMedicinesComponent', () => {
  let component: ImportMedicinesComponent;
  let fixture: ComponentFixture<ImportMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMedicinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
