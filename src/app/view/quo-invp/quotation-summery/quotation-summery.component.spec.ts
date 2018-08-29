import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSummeryComponent } from './quotation-summery.component';

describe('QuotationSummeryComponent', () => {
  let component: QuotationSummeryComponent;
  let fixture: ComponentFixture<QuotationSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
