import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreferenceComponent } from './viewreference.component';

describe('ViewreferenceComponent', () => {
  let component: ViewreferenceComponent;
  let fixture: ComponentFixture<ViewreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
