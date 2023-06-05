import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdateComponent } from './backdate.component';

describe('BackdateComponent', () => {
  let component: BackdateComponent;
  let fixture: ComponentFixture<BackdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
