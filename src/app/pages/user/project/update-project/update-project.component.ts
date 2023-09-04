import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectFBServiceService } from 'src/app/services/project-fbservice.service';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {
  tiposDoc: string[]=["TCC","Extensão","Artigo","Relatório","Monografia","Tese","Dissertação"];
  projectForm!:FormGroup;
  document:any;
  isSubmitted: boolean = false;
  email!:string;
  usuario!: User | null;
  proj!:string;
  projetoPraEditar!: Project | null; 

  constructor(private formBuilder: FormBuilder,private _router : Router,
    private _userFBService: UserFBServiceService, private _projFbService: ProjectFBServiceService){

  }

  ngOnInit(){
    this.email = history.state.email
    this.proj = history.state.proj
    if(this.email == undefined) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this._router.navigate([""]);
    }else{
      this.getUser();
      this.projetoUser();
    }
    this.projectForm = this.formBuilder.group({
      name: [this.projetoPraEditar?.name, [Validators.required]],
      description: [this.projetoPraEditar?.description, [Validators.required]],
      type: [this.projetoPraEditar?.type,[Validators.required]],
      members: [this.projetoPraEditar?.members,[]],
      docURL: [null]
    })
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
  }

  async projetoUser(){
    this.projetoPraEditar = await this._projFbService?.getProjByVddID(this.proj)
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.projectForm.valid){
      console.log("aqui");
    }else{
      this.edit();
    }
  }

  uploadFile(evento: any){
    this.document = evento.target.files[0];
    console.log(this.document.name)
  }

  edit(){
    if(this.projectForm.controls['docURL'].value){
      this._projFbService.updateProj(this.document, this.projectForm.value)
    }else{
      this._projFbService.updateProject(this.projectForm.value)
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
