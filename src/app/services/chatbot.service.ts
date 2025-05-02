import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private readonly WEBHOOK_URL = 'http://localhost:5678/webhook/7a9ea101-1ea5-4bf2-b486-e8c25c6fd1af/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post(this.WEBHOOK_URL, { userMessage: message });
  }
}
