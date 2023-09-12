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
    const userLogged = this._userFBService.usuarioLogged()
    if(this.email == undefined && !userLogged) {
      alert('Ops, ocorreu um engano. Usuário sem seção Registrada.')
      this._router.navigate([""]);
    }else{
      this.getUser();
    }
    this.loadInstitutes()
    this.loadDepartments()
    this.profileForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      academicRegister: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
      institute: ["",[Validators.required]],
      department: ["",[Validators.required]],
      phoneNumber: ["", [Validators.required]],
      photoURL: [null]
    })
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
    this.profileForm.controls['name'].setValue(this.usuario?.name);
    this.profileForm.controls['academicRegister'].setValue(this.usuario?.academicRegister);
    this.profileForm.controls['institute'].setValue(this.usuario?.institute.name);
    this.profileForm.controls['department'].setValue(this.usuario?.department.name);
    this.profileForm.controls['phoneNumber'].setValue(this.usuario?.phoneNumber);
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
    if(!this.profileForm.valid){
      alert("Algo de Errado aconteceu!");
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

  uploadFile(evento: any){
    this.imagem = evento.target.files[0];
  }

  edit(){
    let editUser = {
      id: this.usuario?.id,
      email: this.usuario?.email,
      password: this.usuario?.password,
      name: this.profileForm.controls['name'].value,
      academicRegister: this.profileForm.controls['academicRegister'].value,
      institute: this.profileForm.controls['institute'].value,
      department: this.profileForm.controls['department'].value,
      phoneNumber: this.profileForm.controls['phoneNumber'].value,
      photoURL: this.usuario?.photoURL,
      admin: this.usuario?.admin
    }
    if(this.profileForm.controls['photoURL'].value){
      this._userFBService.updateImg(this.imagem, editUser)
    }else{
      this._userFBService.updateUser(editUser)
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
