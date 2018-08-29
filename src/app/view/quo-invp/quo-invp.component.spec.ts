import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoInvpComponent } from './quo-invp.component';

describe('QuoInvpComponent', () => {
  let component: QuoInvpComponent;
  let fixture: ComponentFixture<QuoInvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoInvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoInvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
