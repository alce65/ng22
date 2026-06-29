import { Routes } from "@angular/router";
import { ContactsAdd } from "../pages/contacts-add/contacts-add";
import { ContactsEdit } from "../pages/contacts-edit/contacts-edit";
import { ContactsList } from "../pages/contacts-list/contacts-list";
import { ContactsView } from "../pages/contacts-view/contacts-view";


export const contactsRoutes: Routes = [

    { path: '', component: ContactsList },
    { path: 'add', component: ContactsAdd },
    { path: ':id/edit', component: ContactsEdit },
    { path: ':id', component: ContactsView },
]
