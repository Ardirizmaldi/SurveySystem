import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSurveyComponent } from './show-survey.component';

describe('ShowSurveyComponent', () => {
  let component: ShowSurveyComponent;
  let fixture: ComponentFixture<ShowSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
