import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneratorComponent } from './user-generator.component';

describe('UserGeneratorComponent', () => {
  let component: UserGeneratorComponent;
  let fixture: ComponentFixture<UserGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
