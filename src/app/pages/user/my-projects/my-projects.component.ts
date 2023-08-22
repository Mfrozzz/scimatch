import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

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
  aaa :any;

  constructor(private _userFBService: UserFBServiceService,private _router : Router){

  }
  ngOnInit(){
    const userLogged = this._userFBService.usuarioLogged()
    if(userLogged){
      console.log(userLogged)
    /*  const userId = this.user?.uid
      this._userFBService.readUser(userId as string).subscribe(res=>{
        this.aaa = res;
        console.log(this.aaa.nome);
      });*/
    }else{
      //this._router.navigate(['/login']);
    }
  }
}
