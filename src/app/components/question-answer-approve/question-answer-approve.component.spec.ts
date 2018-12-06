import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerApproveComponent } from './question-answer-approve.component';

describe('QuestionAnswerApproveComponent', () => {
  let component: QuestionAnswerApproveComponent;
  let fixture: ComponentFixture<QuestionAnswerApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAnswerApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswerApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
