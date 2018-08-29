import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrmAdditionalBenefComponent } from './atrm-additional-benef.component';

describe('AtrmAdditionalBenefComponent', () => {
  let component: AtrmAdditionalBenefComponent;
  let fixture: ComponentFixture<AtrmAdditionalBenefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrmAdditionalBenefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrmAdditionalBenefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
