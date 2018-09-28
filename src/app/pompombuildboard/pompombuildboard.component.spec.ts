import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PompombuildboardComponent } from './pompombuildboard.component';

describe('PompombuildboardComponent', () => {
  let component: PompombuildboardComponent;
  let fixture: ComponentFixture<PompombuildboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PompombuildboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PompombuildboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
