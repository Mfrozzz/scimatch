import { Component } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent {
  panelOpenState = false;
  projetos: string[] = ["projeto 1","projeto 2","projeto 3"];
  descricoes: string[] = ["descricao 1","descricao 2","descricao 3"];

}
