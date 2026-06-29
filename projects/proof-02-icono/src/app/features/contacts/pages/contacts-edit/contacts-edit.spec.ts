import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsEdit } from './contacts-edit';

describe('ContactsEdit', () => {
  let component: ContactsEdit;
  let fixture: ComponentFixture<ContactsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
