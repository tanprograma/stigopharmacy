import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDispensedServerComponent } from './import-dispensed-server.component';

describe('ImportDispensedServerComponent', () => {
  let component: ImportDispensedServerComponent;
  let fixture: ComponentFixture<ImportDispensedServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDispensedServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportDispensedServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
