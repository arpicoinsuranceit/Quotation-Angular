import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoAtrmComponent } from './quo-atrm.component';

describe('QuoAtrmComponent', () => {
  let component: QuoAtrmComponent;
  let fixture: ComponentFixture<QuoAtrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoAtrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoAtrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
