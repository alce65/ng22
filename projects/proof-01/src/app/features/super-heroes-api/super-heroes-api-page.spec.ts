import { ComponentFixture, TestBed } from '@angular/core/testing';

import SuperHeroesApiPage from './super-heroes-api-page';

describe('SuperHeroesApiPage', () => {
  let component: SuperHeroesApiPage;
  let fixture: ComponentFixture<SuperHeroesApiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesApiPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroesApiPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
