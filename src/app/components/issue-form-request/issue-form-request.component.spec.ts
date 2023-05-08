import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormRequestComponent } from './issue-form-request.component';

describe('IssueFormRequestComponent', () => {
  let component: IssueFormRequestComponent;
  let fixture: ComponentFixture<IssueFormRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueFormRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueFormRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
