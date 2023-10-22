import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootNavComponent } from './foot-nav.component';

describe('FootNavComponent', () => {
  let component: FootNavComponent;
  let fixture: ComponentFixture<FootNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootNavComponent]
    });
    fixture = TestBed.createComponent(FootNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
