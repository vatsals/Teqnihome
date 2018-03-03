import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidereferenceComponent } from './providereference.component';

describe('ProvidereferenceComponent', () => {
  let component: ProvidereferenceComponent;
  let fixture: ComponentFixture<ProvidereferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidereferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidereferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
