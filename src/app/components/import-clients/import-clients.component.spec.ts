import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportClientsComponent } from './import-clients.component';

describe('ImportClientsComponent', () => {
  let component: ImportClientsComponent;
  let fixture: ComponentFixture<ImportClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
