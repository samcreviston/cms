import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail {
  @Input() document: Document;
}
