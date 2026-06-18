import { ComponentFixture, TestBed } from '@angular/core/testing';

import SuperHeroesPage from './super-heroes-page';

describe('SuperHeroesPage', () => {
  let component: SuperHeroesPage;
  let fixture: ComponentFixture<SuperHeroesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
