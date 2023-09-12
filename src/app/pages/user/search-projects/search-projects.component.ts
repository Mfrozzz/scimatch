import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Institute } from 'src/app/models/institute';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { InstituteFbserviceService } from 'src/app/services/institute-fbservice.service';
import { ProjectFBServiceService } from 'src/app/services/project-fbservice.service';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

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
  email!:string;
  projs:any = [];
  usuario!: User | null;
  other!: User | null;
  zapTarget:any;
  queryres:any
  currentFilter:any
  filter:any = []
  projectForm!:FormGroup;

  constructor(private institutefb: InstituteFbserviceService,private _router : Router,
    private _userFBService: UserFBServiceService,private _snackBar: MatSnackBar,
    private _projectFbS: ProjectFBServiceService, private formBuilder: FormBuilder){
      /*this.posts$ = this.listPostService.execute()
      this.topics$ = this.listTopicService.execute()
      this.users$ = this.listUsersService.execute()*/
    }

  ngOnInit(){
    this.email = history.state.email
    this.loadInstitutes()
    const userLogged = this._userFBService.usuarioLogged()
    if(this.email == undefined && !userLogged) {
      alert('Ops, ocorreu um engano. Usuário sem seção Registrada.')
      this._router.navigate([""]);
    }else{
      this.getUser();
    }
    this.projectForm = this.formBuilder.group({
      search: ['']
    })
  }

  async teste(pos: string,userId:any) {
    this.currentFilter = pos
    if(this.queryres == this.currentFilter){
      this.queryres = ''
      this.loadAllProjects();
    }else{
      this.queryres = this.currentFilter
      this.projs = await this._projectFbS.getProjByIdUni(this.currentFilter,userId);
    }

  }

  async loadAllProjects() {
    this.projs = await this._projectFbS.getProjByIdReverse(this.usuario?.id)
    this.other = await this._userFBService.getUserByVddID(this.projs.idOwner)
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
    this.loadAllProjects()
    if(!this.usuario?.department || !this.usuario?.institute || !this.usuario?.phoneNumber){
      this.openSnackBar("Termine Seu Cadastro na página do usuário.","Ok")
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  addSearch(param: string) {
    if(this.search !== param){
      this.search = param
    }
  }

  submitForm(query:string){
    this.addSearch(query)
    this.projs = []
    if(this.search){
      this.loadProj(this.search)
    }else{
      alert("Digite o titulo do projeto para fazer a busca.")
    }
  }

  async loadProj(buscador: string){
    return await this._projectFbS.getProjByName(buscador).then((data:Project[])=>{
      this.projs = data;
    })
  }

  async loadInstitutes() {
    return await this.institutefb.readInstitutes().subscribe((data: Institute[]) => {this.options = data;})
  }

  redirect(urlDirect: string) {
    if(this.usuario?.admin){
      this._router.navigateByUrl('/admin/' + this.email,{state: {email:this.email}});
    }
    if(urlDirect == 'myProj'){
      this._router.navigateByUrl('/user/' + this.email,{state: {email:this.email}});
    }else{
      this._router.navigateByUrl('/user/' + this.email + '/' + urlDirect,{state: {email:this.email}});
    }
  }

  verUser(rota:string){
    this._router.navigateByUrl('/user/' + this.email + '/u/'+rota,{state: {email:this.email,nUser:rota}});
  }

  solicita(projeName:string,phone:string){
    console.log(projeName)
    console.log(phone)
    const newText = phone.replace('+','');
    console.log(newText)
    let msg = "Olá, me interessei em seu projeto "+projeName+" gostaria de saber mais sobre, e como posso te ajudar!"
    let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(msg)}`
    this.zapTarget = target
  }


}
