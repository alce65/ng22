import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckModel } from './check-model';

describe('CheckModel', () => {
  let component: CheckModel;
  let fixture: ComponentFixture<CheckModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckModel],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
