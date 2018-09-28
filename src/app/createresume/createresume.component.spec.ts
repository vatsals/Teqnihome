import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateresumeComponent } from './createresume.component';

describe('CreateresumeComponent', () => {
  let component: CreateresumeComponent;
  let fixture: ComponentFixture<CreateresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
