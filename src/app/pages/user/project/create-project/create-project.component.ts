import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProjectFBServiceService } from 'src/app/services/project-fbservice.service';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  tiposDoc: string[]=["TCC","Extensão","Artigo","Relatório","Monografia","Tese","Dissertação"];
  projectForm!:FormGroup;
  document:any;
  isSubmitted: boolean = false;
  email!:string;
  usuario!: User | null;
  docs:any;

  constructor(private formBuilder: FormBuilder,private _router : Router,
    private _userFBService: UserFBServiceService,private _snackBar: MatSnackBar,
    private projectFBservice: ProjectFBServiceService){

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
    this.projectForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["",[Validators.required]],
      docURL: [null]
    })
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
    if(!this.usuario?.department || !this.usuario?.institute || !this.usuario?.phoneNumber){
      this.snackBarUni()
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  snackBarUni(){
    this.openSnackBar("Termine Seu Cadastro na página do usuário.","Ok");
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.projectForm.valid){
      console.log("aqui");
    }else{
      this.create();
      alert('foi')
    }
  }

  uploadFile(evento: any){
    this.docs = evento.target.files[0];
    console.log(this.docs.name)
  }

  async create(){
    if(this.projectForm.controls['docURL'].value){
      await this.projectFBservice.enviarProject(this.docs,this.projectForm.value,this.usuario);
      this.projectForm.reset();
    }else{
      await this.projectFBservice.createProjectMaster(this.projectForm.value,this.usuario!);
      this.projectForm.reset();
      //this.projectFBservice.createProject(this.projectForm.value)
    }
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
