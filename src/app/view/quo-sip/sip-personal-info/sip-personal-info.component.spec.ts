import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SipPersonalInfoComponent } from './sip-personal-info.component';

describe('SipPersonalInfoComponent', () => {
  let component: SipPersonalInfoComponent;
  let fixture: ComponentFixture<SipPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SipPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SipPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
