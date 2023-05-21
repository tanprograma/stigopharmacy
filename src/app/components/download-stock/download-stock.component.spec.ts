import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadStockComponent } from './download-stock.component';

describe('DownloadStockComponent', () => {
  let component: DownloadStockComponent;
  let fixture: ComponentFixture<DownloadStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
