import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtestuserComponent } from './listtestuser.component';

describe('ListtestuserComponent', () => {
  let component: ListtestuserComponent;
  let fixture: ComponentFixture<ListtestuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtestuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtestuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
