import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly WEBHOOK_URL = 'http://localhost:5678/webhook/c16dd77d-835f-4d03-bc80-d22f18e7687e/chat';

  constructor(private http: HttpClient) { }

  sendMessage(chatInput: string): Observable<any> {
    return this.http.post(this.WEBHOOK_URL, { 
      chatInput: chatInput,
      sessionId: 'user-' + Date.now() // ID temporário
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}