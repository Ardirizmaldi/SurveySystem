import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitResponsesComponent } from './submit-responses.component';

describe('SubmitResponsesComponent', () => {
  let component: SubmitResponsesComponent;
  let fixture: ComponentFixture<SubmitResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
