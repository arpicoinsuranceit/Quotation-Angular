import { AtrmAdditionalBenefComponent } from './../../quo-atrm/atrm-additional-benef/atrm-additional-benef.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('End1AdditionalBenefComponent', () => {
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
