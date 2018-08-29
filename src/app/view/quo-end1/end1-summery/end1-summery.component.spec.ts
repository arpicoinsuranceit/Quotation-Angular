import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { End1SummeryComponent } from './end1-summery.component';

describe('End1SummeryComponent', () => {
  let component: End1SummeryComponent;
  let fixture: ComponentFixture<End1SummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ End1SummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(End1SummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
