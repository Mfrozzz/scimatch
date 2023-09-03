import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { User } from 'src/app/models/user';

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

  constructor(private _userFBService: UserFBServiceService,private _router : Router,
    private _snackBar: MatSnackBar){

  }
  ngOnInit(){
    this.email = history.state.email

    if(this.email == undefined) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this._router.navigate([""]);
    }else{
      this.getUser();
      if(!this.usuario?.department || !this.usuario?.institute || !this.usuario?.phoneNumber){
        this.snackBarUni()
      }
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
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  snackBarUni(){
    this.openSnackBar("Termine Seu Cadastro na página do usuário.","Ok");
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
}
