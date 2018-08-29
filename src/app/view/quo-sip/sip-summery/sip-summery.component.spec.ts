import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SipSummeryComponent } from './sip-summery.component';

describe('SipSummeryComponent', () => {
  let component: SipSummeryComponent;
  let fixture: ComponentFixture<SipSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SipSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SipSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
