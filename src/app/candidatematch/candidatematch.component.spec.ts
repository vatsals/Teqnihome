import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatematchComponent } from './candidatematch.component';

describe('CandidatematchComponent', () => {
  let component: CandidatematchComponent;
  let fixture: ComponentFixture<CandidatematchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatematchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatematchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
