import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsfpAdditionalBenefComponent } from './asfp-additional-benef.component';

describe('AsfpAdditionalBenefComponent', () => {
  let component: AsfpAdditionalBenefComponent;
  let fixture: ComponentFixture<AsfpAdditionalBenefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsfpAdditionalBenefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsfpAdditionalBenefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
