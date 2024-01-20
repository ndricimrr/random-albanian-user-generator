import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTableViewComponent } from './users-grid-table-view.component';

describe('GridTableViewComponent', () => {
  let component: GridTableViewComponent;
  let fixture: ComponentFixture<GridTableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridTableViewComponent],
    });
    fixture = TestBed.createComponent(GridTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
