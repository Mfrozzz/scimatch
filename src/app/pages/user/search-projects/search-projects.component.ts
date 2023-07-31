import { Component } from '@angular/core';

@Component({
  selector: 'app-search-projects',
  templateUrl: './search-projects.component.html',
  styleUrls: ['./search-projects.component.css']
})
export class SearchProjectsComponent {
  search : String ="";
  options: string[] = ['UNICENTRO - Universidade Estadual do Centro Oeste',
  'Centro Universitário UniGuairacá',
  'Centro Universitário Campo Real',
  'UTFPR - Guarapuava'];
  panelOpenState = false;
  projetos: string[] = ["projeto 1","projeto 2","projeto 3"];
  descricoes: string[] = ["descricao 1","descricao 2","descricao 3"];
}
