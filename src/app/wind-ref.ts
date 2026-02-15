import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindRef {
  constructor() {}

  getNativeWindow() {
    return window;
  }
}
