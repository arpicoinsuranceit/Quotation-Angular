import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtaSummeryComponent } from './dta-summery.component';

describe('DtaSummeryComponent', () => {
  let component: DtaSummeryComponent;
  let fixture: ComponentFixture<DtaSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtaSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtaSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
