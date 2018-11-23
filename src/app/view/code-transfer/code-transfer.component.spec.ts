import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTransferComponent } from './code-transfer.component';

describe('CodeTransferComponent', () => {
  let component: CodeTransferComponent;
  let fixture: ComponentFixture<CodeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
