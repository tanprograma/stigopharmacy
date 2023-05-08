import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  messages: string[] = [];
  log(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
  constructor() {}
}
