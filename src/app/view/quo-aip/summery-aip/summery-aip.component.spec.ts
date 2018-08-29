import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryAipComponent } from './summery-aip.component';

describe('SummeryAipComponent', () => {
  let component: SummeryAipComponent;
  let fixture: ComponentFixture<SummeryAipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryAipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryAipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
