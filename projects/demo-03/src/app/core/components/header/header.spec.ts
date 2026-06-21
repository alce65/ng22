import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['title']()).toContain('Angular');
    expect(component['subtitle']()).toContain('Aprende');
  });

  it("should render title", async () => {
    await fixture.whenStable();
    const elementH1 = debugElement.query(By.css("h1")).nativeElement as HTMLHeadingElement;
    const eParagraph = debugElement.query(By.css("p")).nativeElement as HTMLParagraphElement;
    expect(elementH1.textContent).toContain("Angular");
    expect(eParagraph.textContent).toContain("Aprende");
  });

});
