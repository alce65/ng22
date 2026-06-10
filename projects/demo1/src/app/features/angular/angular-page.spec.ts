import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPage } from './angular-page';

describe('AngularPage', () => {
  let component: AngularPage;
  let fixture: ComponentFixture<AngularPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
