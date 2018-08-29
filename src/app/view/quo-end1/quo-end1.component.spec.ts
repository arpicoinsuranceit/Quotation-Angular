import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoEnd1Component } from './quo-end1.component';

describe('QuoEnd1Component', () => {
  let component: QuoEnd1Component;
  let fixture: ComponentFixture<QuoEnd1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoEnd1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoEnd1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
