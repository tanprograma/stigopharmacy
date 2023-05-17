import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormxComponent } from './admin-formx.component';

describe('AdminFormxComponent', () => {
  let component: AdminFormxComponent;
  let fixture: ComponentFixture<AdminFormxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
