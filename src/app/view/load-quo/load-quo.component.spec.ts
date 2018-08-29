import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuoComponent } from './load-quo.component';

describe('LoadQuoComponent', () => {
  let component: LoadQuoComponent;
  let fixture: ComponentFixture<LoadQuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadQuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadQuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
