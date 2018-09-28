import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardreqComponent } from './cardreq.component';

describe('CardreqComponent', () => {
  let component: CardreqComponent;
  let fixture: ComponentFixture<CardreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
