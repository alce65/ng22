import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxFree } from './check-box-free';

describe('CheckBoxFree', () => {
  let component: CheckBoxFree;
  let fixture: ComponentFixture<CheckBoxFree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckBoxFree],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckBoxFree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
