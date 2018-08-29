import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadInquiriesComponent } from './load-inquiries.component';

describe('LoadInquiriesComponent', () => {
  let component: LoadInquiriesComponent;
  let fixture: ComponentFixture<LoadInquiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadInquiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
