import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjdashboardComponent } from './projdashboard.component';

describe('ProjdashboardComponent', () => {
  let component: ProjdashboardComponent;
  let fixture: ComponentFixture<ProjdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
