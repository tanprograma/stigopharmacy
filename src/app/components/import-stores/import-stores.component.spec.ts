import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStoresComponent } from './import-stores.component';

describe('ImportStoresComponent', () => {
  let component: ImportStoresComponent;
  let fixture: ComponentFixture<ImportStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
