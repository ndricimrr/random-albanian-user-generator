import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSwitcherComponent } from './page-switcher.component';

describe('PageSwitcherComponent', () => {
  let component: PageSwitcherComponent;
  let fixture: ComponentFixture<PageSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
