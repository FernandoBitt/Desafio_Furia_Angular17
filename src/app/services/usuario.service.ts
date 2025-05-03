import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface usuarioResponse {
  nome?: string;
  email?: string;
  endereco?: string;
  cpf?: number;
  instagram?: string;
  x?: string;
  telefone?: number;
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private endpointUrl = 'http://localhost:8080/usuario';
  private readonly WEBHOOK_URL = 'http://localhost:5678/webhook/f03f7ca4-ba3e-48e0-9bcb-e52105a950be';

  constructor(private http: HttpClient) { }



  sendData(
    nome: string,
    email: string,
    endereco: string,
    cpf: number,
    instagram: string,
    x: string,
    telefone: number
  ): Observable<usuarioResponse> {
    const data = { nome, email, endereco, cpf, instagram, x, telefone };

    // Requisição principal (mantém o retorno original)
    const retorno = this.http.post<usuarioResponse>(this.endpointUrl, data);

    // Chamada ao webhook com tratamento robusto de erros
    this.http.post(this.WEBHOOK_URL, { Username: data.x })
      .subscribe({
        next: (response) => console.log('Webhook success:', response),
        error: (err) => {
          if (err.status === 429 || err.status === 500) {
            console.warn('Webhook temporariamente indisponível (rate limit/API bloqueada):', err.message);
            
          } else {
            console.error('Erro no webhook:', err);
          }
        }
      });

    return retorno;
  }

}