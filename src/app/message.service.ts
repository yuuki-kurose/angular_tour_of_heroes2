import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  // add()は新しいメッセージを[]に追加する役割
  add(message: string) {
    this.messages.push(message);
  } 
  // clear()は追加されたメッセージを削除する役割(初期化) 
  clear() {
    this.messages = [];
  }
 
  constructor() { }
}
