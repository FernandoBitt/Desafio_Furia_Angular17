import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    UsuarioFormComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //dados mockados utilizar api para extração de resultados em tempo real
  dado1: "Furia 13x8 Imperial" = "Furia 13x8 Imperial";
  dado2: "Furia 20x10 Pain" = "Furia 20x10 Pain";
  dado3: "Furia 6x2 Loud" = "Furia 6x2 Loud";
  dado4: "Proximo Jogo - CS dia 04/05" = "Proximo Jogo - CS dia 04/05";
  
}



