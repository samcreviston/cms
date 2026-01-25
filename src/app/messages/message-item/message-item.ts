import { Component, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  @Input() message: Message;
}
