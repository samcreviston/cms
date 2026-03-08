import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = [];
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): Message[] {
    this.http.get<Message[]>('https://cms-430-1c183-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
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

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-430-1c183-default-rtdb.firebaseio.com/messages.json', messagesString, { headers })
      .subscribe(
        () => {
          this.messageChangedEvent.emit(this.messages.slice());
        }
      );
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.storeMessages();
  }
}
