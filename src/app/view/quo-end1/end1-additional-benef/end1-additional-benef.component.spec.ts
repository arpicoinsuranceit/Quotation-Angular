import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { End1AdditionalBenefComponent } from './end1-additional-benef.component';

describe('End1AdditionalBenefComponent', () => {
  let component: End1AdditionalBenefComponent;
  let fixture: ComponentFixture<End1AdditionalBenefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ End1AdditionalBenefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(End1AdditionalBenefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
