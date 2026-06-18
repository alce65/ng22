import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCheckModel } from './use-check-model';

describe('UseCheckModel', () => {
  let component: UseCheckModel;
  let fixture: ComponentFixture<UseCheckModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseCheckModel],
    }).compileComponents();

    fixture = TestBed.createComponent(UseCheckModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
