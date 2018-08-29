import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrmSummeryComponent } from './atrm-summery.component';

describe('AtrmSummeryComponent', () => {
  let component: AtrmSummeryComponent;
  let fixture: ComponentFixture<AtrmSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrmSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrmSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
