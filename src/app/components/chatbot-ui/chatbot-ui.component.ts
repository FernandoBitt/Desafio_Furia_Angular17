import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot-ui',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './chatbot-ui.component.html',
  styleUrl: './chatbot-ui.component.scss'
})
export class ChatbotUiComponent {
  userInput = '';
  messages: { text: string; isUser: boolean }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, isUser: true });
    this.chatbotService.sendMessage(this.userInput).subscribe((response: any) => {
      this.messages.push({ text: response.botReply, isUser: false });
    });
    this.userInput = ''; 
  }
}
