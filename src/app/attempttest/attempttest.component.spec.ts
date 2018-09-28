import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttempttestComponent } from './attempttest.component';

describe('AttempttestComponent', () => {
  let component: AttempttestComponent;
  let fixture: ComponentFixture<AttempttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttempttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttempttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
