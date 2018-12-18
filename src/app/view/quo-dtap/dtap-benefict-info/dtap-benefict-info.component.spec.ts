import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtapBenefictInfoComponent } from './dtap-benefict-info.component';

describe('DtaBenefictInfoComponent', () => {
  let component: DtapBenefictInfoComponent;
  let fixture: ComponentFixture<DtapBenefictInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtapBenefictInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtapBenefictInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
