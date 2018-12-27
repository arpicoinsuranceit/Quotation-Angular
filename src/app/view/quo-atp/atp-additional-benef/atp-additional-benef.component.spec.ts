import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpAdditionalBenefComponent } from './atp-additional-benef.component';

describe('AtpAdditionalBenefComponent', () => {
  let component: AtpAdditionalBenefComponent;
  let fixture: ComponentFixture<AtpAdditionalBenefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtpAdditionalBenefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtpAdditionalBenefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
