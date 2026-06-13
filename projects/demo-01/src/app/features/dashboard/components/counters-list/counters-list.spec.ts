import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersList } from './counters-list';

describe('CountersList', () => {
  let component: CountersList;
  let fixture: ComponentFixture<CountersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountersList],
    }).compileComponents();

    fixture = TestBed.createComponent(CountersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
