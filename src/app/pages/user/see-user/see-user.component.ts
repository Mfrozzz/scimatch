import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-see-user',
  templateUrl: './see-user.component.html',
  styleUrls: ['./see-user.component.css']
})
export class SeeUserComponent {
  email!:string;
  otherEmail!:string;
  usuario!: User | null;
  other!: User | null;
  constructor(private _userFBService: UserFBServiceService,private _router : Router,
    private _snackBar: MatSnackBar){

  }

  ngOnInit(){
    this.email = history.state.email;
    this.otherEmail = history.state.nUser;
    const userLogged = this._userFBService.usuarioLogged()
    if(this.email == undefined && !userLogged) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this._router.navigate([""]);
    }else{
      this.getUser();
      if(!this.usuario?.department || !this.usuario?.institute || !this.usuario?.phoneNumber){
        this.snackBarUni()
      }
    }
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

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
    this.other = await this._userFBService?.getUserByEmail(this.otherEmail);
  }
}
