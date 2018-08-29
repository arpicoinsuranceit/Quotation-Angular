import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtaBenefictInfoComponent } from './dta-benefict-info.component';

describe('DtaBenefictInfoComponent', () => {
  let component: DtaBenefictInfoComponent;
  let fixture: ComponentFixture<DtaBenefictInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtaBenefictInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtaBenefictInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
