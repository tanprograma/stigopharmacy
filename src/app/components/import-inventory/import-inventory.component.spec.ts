import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportInventoryComponent } from './import-inventory.component';

describe('ImportInventoryComponent', () => {
  let component: ImportInventoryComponent;
  let fixture: ComponentFixture<ImportInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
