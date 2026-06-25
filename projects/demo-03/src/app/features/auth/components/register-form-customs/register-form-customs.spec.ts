import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormCustoms } from './register-form-customs';

describe('RegisterFormCustoms', () => {
  let component: RegisterFormCustoms;
  let fixture: ComponentFixture<RegisterFormCustoms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormCustoms],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormCustoms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
