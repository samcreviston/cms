import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.contacts = [];
  }

  getContacts(): Contact[] {
    this.http.get<{ message: string; contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts ?? [];
          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactListChangedEvent.next(this.contacts.filter((contact) => !contact.group || contact.group.length === 0));
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
    return this.contacts.slice().filter((contact) => !contact.group || contact.group.length === 0);
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id || contact._id === id) {
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>('http://localhost:3000/contacts', newContact, {
        headers: headers,
      })
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id).subscribe(() => {
      this.contacts.splice(pos, 1);
      this.sortAndSend();
    });
  }

  private sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.contactListChangedEvent.next(this.contacts.filter((contact) => !contact.group || contact.group.length === 0));
  }
}
