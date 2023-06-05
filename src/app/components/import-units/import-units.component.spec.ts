import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUnitsComponent } from './import-units.component';

describe('ImportUnitsComponent', () => {
  let component: ImportUnitsComponent;
  let fixture: ComponentFixture<ImportUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportUnitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
