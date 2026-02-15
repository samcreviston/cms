import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Documents } from './documents/documents';
import { MessageList } from './messages/message-list/message-list';
import { Contacts } from './contacts/contacts';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { ContactEdit } from './contacts/contact-edit/contact-edit';
import { ContactDetail } from './contacts/contact-detail/contact-detail';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { 
    path: 'documents', 
    component: Documents,
    children: [
      { path: 'new', component: DocumentEdit },
      { path: ':id', component: DocumentDetail },
      { path: ':id/edit', component: DocumentEdit }
    ]
  },
  { path: 'messages', component: MessageList },
  { 
    path: 'contacts', 
    component: Contacts,
    children: [
      { path: 'new', component: ContactEdit },
      { path: ':id', component: ContactDetail },
      { path: ':id/edit', component: ContactEdit }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
