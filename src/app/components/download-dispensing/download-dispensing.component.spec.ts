import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDispensingComponent } from './download-dispensing.component';

describe('DownloadDispensingComponent', () => {
  let component: DownloadDispensingComponent;
  let fixture: ComponentFixture<DownloadDispensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDispensingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadDispensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
