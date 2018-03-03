import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateappliedComponent } from './candidateapplied.component';

describe('CandidateappliedComponent', () => {
  let component: CandidateappliedComponent;
  let fixture: ComponentFixture<CandidateappliedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateappliedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateappliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
