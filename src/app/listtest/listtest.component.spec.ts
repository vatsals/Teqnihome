import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtestComponent } from './listtest.component';

describe('ListtestComponent', () => {
  let component: ListtestComponent;
  let fixture: ComponentFixture<ListtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
