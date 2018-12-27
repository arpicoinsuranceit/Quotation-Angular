import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpSummeryComponent } from './atp-summery.component';

describe('AtpSummeryComponent', () => {
  let component: AtpSummeryComponent;
  let fixture: ComponentFixture<AtpSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtpSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtpSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
