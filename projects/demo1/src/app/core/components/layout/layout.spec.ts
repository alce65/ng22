import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

const TEXT = 'Hello World';
const MAIN_MENU = 'main-menu';

@Component({
  imports: [Layout],
  template: `<alc-layout>
    <div class="main-menu">{{ menu }}</div>
    {{ text }}
  </alc-layout>`,
})
class TestHostComponent {
  protected readonly text = TEXT;
  protected readonly menu = MAIN_MENU;
}

describe('Layout', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const layoutElement: HTMLElement = debugElement.query(By.directive(Layout)).nativeElement;
    expect(layoutElement).toBeTruthy();
    expect(layoutElement.textContent).toContain(TEXT);
    const headerElement: HTMLElement = debugElement.query(By.directive(Header)).nativeElement;
    expect(headerElement).toBeTruthy();
    expect(headerElement.textContent).toContain(MAIN_MENU);
    const footerElement: HTMLElement = debugElement.query(By.directive(Footer)).nativeElement;
    expect(footerElement).toBeTruthy();
  });
});
