import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecresumeComponent } from './specresume.component';

describe('SpecresumeComponent', () => {
  let component: SpecresumeComponent;
  let fixture: ComponentFixture<SpecresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
