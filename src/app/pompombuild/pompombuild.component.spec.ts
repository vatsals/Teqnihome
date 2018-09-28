import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PompombuildComponent } from './pompombuild.component';

describe('PompombuildComponent', () => {
  let component: PompombuildComponent;
  let fixture: ComponentFixture<PompombuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PompombuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PompombuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
