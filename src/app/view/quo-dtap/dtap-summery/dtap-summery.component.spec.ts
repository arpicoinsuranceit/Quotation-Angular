import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtapSummeryComponent } from './dtap-summery.component';

describe('DtaSummeryComponent', () => {
  let component: DtapSummeryComponent;
  let fixture: ComponentFixture<DtapSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtapSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtapSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
