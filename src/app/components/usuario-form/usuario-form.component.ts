import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  providers: [UsuarioService],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {

  usuarioForm!: FormGroup;
  loading = signal(false);

  constructor(private service: UsuarioService){
    this.usuarioForm = new FormGroup({
      nome: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      endereco: new FormControl('',[Validators.required]),
      cpf:  new FormControl('',[Validators.required]),
      instagram:  new FormControl('',[Validators.required]),
      x:  new FormControl('',[Validators.required]),
      telefone: new FormControl('',[Validators.required,Validators.minLength(9)]),
    });
  }
  
  sendTo() {
    this.loading.set(true);
    if(this.usuarioForm.valid){
      this.service.sendData(this.usuarioForm.value.nome,
        this.usuarioForm.value.email,
        this.usuarioForm.value.endereco,
        this.usuarioForm.value.cpf,
        this.usuarioForm.value.instagram,
        this.usuarioForm.value.x,
        this.usuarioForm.value.telefone,
      ).subscribe({
        next: () => {
          this.usuarioForm.reset();
          this.loading.set(false);
        }
      })
    }
  }

  
}
