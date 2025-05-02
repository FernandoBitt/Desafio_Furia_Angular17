import { Component, ChangeDetectorRef, output } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot-ui',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot-ui.component.html',
  styleUrl: './chatbot-ui.component.scss'
})


export class ChatbotUiComponent {
  
  sessionId = '';
  chatInput: { text: string; isUser: boolean }[] = [];

  constructor(
    private chatbotService: ChatbotService,
    private cdr: ChangeDetectorRef
  ) {}

  sendMessage() {
    if (!this.sessionId.trim()) return;

    // Adiciona mensagem do usuário (abordagem imutável)
    this.chatInput = [...this.chatInput, { text: this.sessionId, isUser: true }];
    this.cdr.detectChanges(); // Força a primeira atualização

    this.chatbotService.sendMessage(this.sessionId).subscribe({
      next: (response: any) => {

        //Validação de Mensagem
        console.log('Resposta completa:', response);
 
        const botReply = this.getBotReply(response);

        
        // Adiciona resposta do bot (nova abordagem)
        setTimeout(() => {
          this.chatInput = [...this.chatInput, { text: botReply, isUser: false }];
          this.cdr.detectChanges();
          
          // Rolagem automática para a última mensagem
          this.scrollToBottom();
        }, 0);
      },
      error: (error) => {
        console.error('Erro:', error);
        this.chatInput = [...this.chatInput, { text: 'Erro ao conectar com o chatbot', isUser: false }];
        this.cdr.detectChanges();
      }
    });

    this.sessionId = '';
  }

  private getBotReply(input: any): string {
    return (input?.output || '')
      .replace('```json', '')
      .replace('```', '');
  }

  


  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.messages-wrapper');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}