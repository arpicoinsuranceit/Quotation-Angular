import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtaplSummeryComponent } from './dtapl-summery.component';

describe('DtaplSummeryComponent', () => {
  let component: DtaplSummeryComponent;
  let fixture: ComponentFixture<DtaplSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtaplSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtaplSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
