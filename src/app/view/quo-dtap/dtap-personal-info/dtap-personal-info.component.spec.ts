import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtapPersonalInfoComponent } from './dtap-personal-info.component';

describe('DtaPersonalInfoComponent', () => {
  let component: DtapPersonalInfoComponent;
  let fixture: ComponentFixture<DtapPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtapPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtapPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
