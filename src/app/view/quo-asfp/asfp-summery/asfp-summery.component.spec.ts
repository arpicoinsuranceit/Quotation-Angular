import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsfpSummeryComponent } from './asfp-summery.component';

describe('AsfpSummeryComponent', () => {
  let component: AsfpSummeryComponent;
  let fixture: ComponentFixture<AsfpSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsfpSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsfpSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
