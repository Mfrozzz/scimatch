import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
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

  constructor(private formBuilder: FormBuilder,private _router : Router,
    private _userFBService: UserFBServiceService){

  }

  ngOnInit(){
    this.email = history.state.email
    if(this.email == undefined) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this._router.navigate([""]);
    }else{
      this.getUser();
    }
    this.projectForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["",[Validators.required]],
      members: ["",[]],
      docURL: ["",[Validators.required]]
    })
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.projectForm.valid){
      console.log("aqui");
    }else{
      this.edit();
    }
  }

  uploadFile(document:any){
    this.document = document.files;
  }

  edit(){
    
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
