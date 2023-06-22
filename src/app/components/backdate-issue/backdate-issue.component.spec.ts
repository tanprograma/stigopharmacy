import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdateIssueComponent } from './backdate-issue.component';

describe('BackdateIssueComponent', () => {
  let component: BackdateIssueComponent;
  let fixture: ComponentFixture<BackdateIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdateIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackdateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
