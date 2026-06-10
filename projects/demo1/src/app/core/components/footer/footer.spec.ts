import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a address with 3 paragraphs', () => {
    const autor = component['autor']();
    const brand = component['brand']();

    const today = 2000
    component['today'].set(new Date('2000-01-01'));
    fixture.detectChanges();

    const addressElement: HTMLElement = debugElement.query(By.css('address')).nativeElement;
    expect(addressElement).toBeTruthy();
    const pElements: HTMLParagraphElement[] = debugElement
      .queryAll(By.css('p'))
      .map((de) => de.nativeElement);
    expect(pElements[0].textContent).toEqual(autor);
    expect(pElements[1].textContent).toEqual(brand);
    expect(pElements[2].textContent).toEqual(today.toString());
  });
});
