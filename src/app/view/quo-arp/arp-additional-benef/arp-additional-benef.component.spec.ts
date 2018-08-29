import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArpAdditionalBenefComponent } from './arp-additional-benef.component';

describe('ArpAdditionalBenefComponent', () => {
  let component: ArpAdditionalBenefComponent;
  let fixture: ComponentFixture<ArpAdditionalBenefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArpAdditionalBenefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArpAdditionalBenefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
