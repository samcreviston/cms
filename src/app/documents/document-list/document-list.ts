import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document(
      '1',
      'CIT 260 - Object Oriented Programming',
      'Learn fundamental object oriented programming concepts',
      'https://content.byui.edu/file/b4b4b7e6-2c67-4c0c-b8b5-4e1b8f8f8f8f/1/CIT%20260%20course%20description.pdf',
      null
    ),
    new Document(
      '2',
      'CIT 366 - Full Web Stack Development',
      'Learn how to develop modern web applications using the MEAN stack',
      'https://content.byui.edu/file/b7c5bc4c-4e5d-3f7a-e947-4bf1-8d32-4e4b38f7ae7/1/CIT%20366%20course%20description.pdf',
      null
    ),
    new Document(
      '3',
      'CIT 425 - Data Warehousing',
      'Learn data warehousing concepts and techniques',
      'https://content.byui.edu/file/c7d3e5f6-3g4h-5i6j-k7l8-m9n0o1p2q3r4/1/CIT%20425%20course%20description.pdf',
      null
    ),
    new Document(
      '4',
      'CIT 460 - Enterprise Development',
      'Learn enterprise-level software development practices',
      'https://content.byui.edu/file/d8e4f6g7-4h5i-6j7k-l8m9-n0o1p2q3r4s5/1/CIT%20460%20course%20description.pdf',
      null
    ),
    new Document(
      '5',
      'CIT 495 - Senior Practicum',
      'Capstone project course',
      'https://content.byui.edu/file/e9f5g7h8-5i6j-7k8l-m9n0-o1p2q3r4s5t6/1/CIT%20495%20course%20description.pdf',
      null
    )
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
