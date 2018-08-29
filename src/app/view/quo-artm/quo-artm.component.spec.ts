import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoArtmComponent } from './quo-artm.component';

describe('QuoArtmComponent', () => {
  let component: QuoArtmComponent;
  let fixture: ComponentFixture<QuoArtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoArtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoArtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
