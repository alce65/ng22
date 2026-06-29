import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAdd } from './contacts-add';

describe('ContactsAdd', () => {
  let component: ContactsAdd;
  let fixture: ComponentFixture<ContactsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
