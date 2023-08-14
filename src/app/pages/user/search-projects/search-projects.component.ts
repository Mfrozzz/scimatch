import { Component } from '@angular/core';
import { Institute } from 'src/app/models/institute';
import { InstituteFbserviceService } from 'src/app/services/institute-fbservice.service';

@Component({
  selector: 'app-search-projects',
  templateUrl: './search-projects.component.html',
  styleUrls: ['./search-projects.component.css']
})
export class SearchProjectsComponent {
  search : string ="";
  options: Institute[] = [];
  panelOpenState = false;
  projetos: string[] = ["projeto 1","projeto 2","projeto 3"];
  descricoes: string[] = ["descricao 1","descricao 2","descricao 3"];

  constructor(private institutefb: InstituteFbserviceService){}

  ngOnInit(){
    this.loadInstitutes()
  }

  async loadInstitutes() {
    return await this.institutefb.readInstitutes().subscribe((data: Institute[]) => {this.options = data;})
  }
}
