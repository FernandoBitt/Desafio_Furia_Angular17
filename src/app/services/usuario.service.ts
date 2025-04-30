import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface usuarioResponse{
  nome?: string;
  email?: string;
  endereco?: string;
  cpf?: number;
  instagram?:string;
  x?:string;
  telefone?:number;
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private endpointUrl = 'http://localhost:8080/usuario';

  constructor(private http:HttpClient) { }

  

  sendData(nome:string,email:string,endereco:string,cpf:number,
    instagram:string,x:string,telefone:number) : Observable<usuarioResponse>{
    const data = {nome,email,endereco,cpf,instagram,x,telefone}
  
    var retorno = this.http.post<usuarioResponse>(this.endpointUrl, data);
    console.log(retorno);
    return retorno;
    
  }
}
