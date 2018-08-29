import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQuoComponent } from './print-quo.component';

describe('PrintQuoComponent', () => {
  let component: PrintQuoComponent;
  let fixture: ComponentFixture<PrintQuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintQuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintQuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
