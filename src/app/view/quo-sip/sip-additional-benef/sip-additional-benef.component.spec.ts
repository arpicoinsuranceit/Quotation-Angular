import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SipAdditionalBenefComponent } from './sip-additional-benef.component';

describe('SipAdditionalBenefComponent', () => {
  let component: SipAdditionalBenefComponent;
  let fixture: ComponentFixture<SipAdditionalBenefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SipAdditionalBenefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SipAdditionalBenefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
