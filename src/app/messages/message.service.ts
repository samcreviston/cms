import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.messages = [];
  }

  getMessages(): Message[] {
    this.http.get<{ message: string; messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = (responseData.messages ?? []).map((message) => ({
            ...message,
            sender:
              typeof message.sender === 'object' && message.sender !== null
                ? (message.sender as any)._id
                : message.sender,
          }));
          this.messages.sort((a, b) => {
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return 0;
          });
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        }
      );
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message): void {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; messageObject: Message }>('http://localhost:3000/messages', message, {
        headers: headers,
      })
      .subscribe((responseData) => {
        this.messages.push(responseData.messageObject);
        this.sortAndSend();
      });
  }

  private sortAndSend() {
    this.messages.sort((a, b) => {
      if (a.subject < b.subject) return -1;
      if (a.subject > b.subject) return 1;
      return 0;
    });

    this.messageChangedEvent.emit(this.messages.slice());
  }
}
