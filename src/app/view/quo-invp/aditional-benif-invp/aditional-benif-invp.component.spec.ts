import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalBenifInvpComponent } from './aditional-benif-invp.component';

describe('AditionalBenifInvpComponent', () => {
  let component: AditionalBenifInvpComponent;
  let fixture: ComponentFixture<AditionalBenifInvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AditionalBenifInvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AditionalBenifInvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
