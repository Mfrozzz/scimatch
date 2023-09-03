import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Institute } from 'src/app/models/institute';
import { User } from 'src/app/models/user';
import { DepartmentFbserviceService } from 'src/app/services/department-fbservice.service';
import { InstituteFbserviceService } from 'src/app/services/institute-fbservice.service';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm!:FormGroup;
  imagem:any;
  isSubmitted: boolean = false;
  institutes: Institute[] = [];
  departments: Department[] = [];
  email!:string;
  usuario!: User | null;

  constructor(private formBuilder: FormBuilder,private departmentfb: DepartmentFbserviceService,
    private institutefb: InstituteFbserviceService,private _router : Router,
    private _userFBService: UserFBServiceService,private _snackBar: MatSnackBar){

  }

  ngOnInit(){
    this.email = history.state.email
    if(this.email == undefined) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this._router.navigate([""]);
    }else{
      this.getUser();
      if(!this.usuario?.department || !this.usuario.institute || !this.usuario.phoneNumber){
        this.snackBarUni()
      }
    }
    this.profileForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required]],
      academicRegister: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
      institute: ["",[Validators.required]],
      department: ["",[Validators.required]],
      phoneNumber: ["", [Validators.required]],
      photoURL: ["",[Validators.required]]
    })
    this.loadInstitutes()
    this.loadDepartments()
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

  submitForm(){
    this.isSubmitted = true;
    if(!this.profileForm.valid){
      console.log("aqui");
    }else{
      this.edit();
    }
  }

  async loadInstitutes() {
    return await this.institutefb.readInstitutes().subscribe((data: Institute[]) => {this.institutes = data;})
  }

  async loadDepartments() {
    return await this.departmentfb.readDepartments().subscribe((data: Department[]) => {this.departments = data;})
  }

  uploadFile(imagem:any){
    this.imagem = imagem.files;
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
