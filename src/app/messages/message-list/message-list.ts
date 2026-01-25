import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message(
      '1',
      'Assignment Grades',
      'The grades for this assignment have been posted',
      'Bro. Jackson'
    ),
    new Message(
      '2',
      'Assignment 3 Due Date',
      'When is assignment 4 due',
      'Steve Johnson'
    ),
    new Message(
      '3',
      'Assignment 3 Reminder',
      'Assignment 3 is due next Saturday at 11:30 PM',
      'Bro. Jackson'
    )
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
