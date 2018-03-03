import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyjobspostComponent } from './myjobspost.component';

describe('MyjobspostComponent', () => {
  let component: MyjobspostComponent;
  let fixture: ComponentFixture<MyjobspostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyjobspostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyjobspostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
