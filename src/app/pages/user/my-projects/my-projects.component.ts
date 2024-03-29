import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectFBServiceService } from 'src/app/services/project-fbservice.service';

import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent {
  panelOpenState = false;
  projetos: string[] = ["projeto 1","projeto 2","projeto 3"];
  descricoes: string[] = ["descricao 1","descricao 2","descricao 3"];
  auth = getAuth();
  user = this.auth.currentUser;
  email!:string;
  usuario!: User | null;
  myProj: any = []

  constructor(private _userFBService: UserFBServiceService,private _router : Router,
    private _snackBar: MatSnackBar, private _projectFbS: ProjectFBServiceService){

  }
  ngOnInit(){
    this.email = history.state.email
    const userLogged = this._userFBService.usuarioLogged()
    if(this.email == undefined && !userLogged) {
      alert('Ops, ocorreu um engano. Usuário sem seção Registrada.')
      this._router.navigate([""]);
    }else{
      this.getUser();
    }

    /*const userLogged = this._userFBService.usuarioLogged()
    if(userLogged){
      console.log(userLogged)
    /*  const userId = this.user?.uid
      this._userFBService.readUser(userId as string).subscribe(res=>{
        this.aaa = res;
        console.log(this.aaa.nome);
      });
    }else{
      //this._router.navigate(['/login']);
    }*/
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
    this.loadMyProjects()
    if(!this.usuario?.department || !this.usuario?.institute || !this.usuario?.phoneNumber){
      this.snackBarUni()
    }
  }

  async loadMyProjects() {
    this.myProj = await this._projectFbS.getProjById(this.usuario?.id)
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  snackBarUni(){
    this.openSnackBar("Termine Seu Cadastro na página do usuário.","Ok");
  }

  redirect(urlDirect: string) {
    if(urlDirect == 'myProj'){
      this._router.navigateByUrl('/user/' + this.email,{state: {email:this.email}});
    }else{
      this._router.navigateByUrl('/user/' + this.email + '/' + urlDirect,{state: {email:this.email}});
    }
  }

  checkAdm(urlDirect: string){
    if(this.usuario?.admin && urlDirect=='myProj'){
      this._router.navigateByUrl('/admin/' + this.email,{state: {email:this.email}});
    }else{
      this.redirect(urlDirect);
    }
  }

  editarProj(projeto:Project){
    this._router.navigateByUrl('/user/' + this.email + '/project/update/'+projeto.id,{state: {email:this.email,proj:projeto.id}});
  }

  async excluirProj(projeto:Project){
    let exclusão = confirm("Deseja excluir seu projeto "+projeto.name+"?")
    if(exclusão){
      await this._projectFbS.deleteProject(projeto).then(()=>{
        alert("Projeto excluido com sucesso.");
        window.location.reload();
      }).catch((error)=>{
        alert("Erro ao excluir Projeto");
        console.log(error);
      })
    }
  }
}
