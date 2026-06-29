import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerDemo } from './logger-demo';

describe('LoggerDemo', () => {
  let component: LoggerDemo;
  let fixture: ComponentFixture<LoggerDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggerDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(LoggerDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
