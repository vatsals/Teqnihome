import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecardComponent } from './specard.component';

describe('SpecardComponent', () => {
  let component: SpecardComponent;
  let fixture: ComponentFixture<SpecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
