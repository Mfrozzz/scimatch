import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitation } from 'src/app/models/solicitation';
import { User } from 'src/app/models/user';
import { SolicitationFbServiceService } from 'src/app/services/solicitation-fb-service.service';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  solicitationForm!:FormGroup;
  isSubmitted: boolean = false;
  user!: User;
  email!:string;
  usuario!: User | null;


  constructor(private formBuilder: FormBuilder,private solicitationfb: SolicitationFbServiceService,
    private _router : Router,private _userFBService: UserFBServiceService){

  }

  ngOnInit(){
    this.email = history.state.email
    const userLogged = this._userFBService.usuarioLogged()
    if(this.email == undefined && !userLogged) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this._router.navigate([""]);
    }else{
      this.getUser();
    }
    this.solicitationForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.solicitationForm.valid){
      console.log("aqui");
    }else{
      this.execute();
    }
  }

  private async execute(){
    await this.solicitationfb.createSolicitationMaster(this.solicitationForm.value,this.usuario?.id)
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
