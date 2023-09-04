import {Component} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {NgIf, NgFor, AsyncPipe} from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstituteFbserviceService } from 'src/app/services/institute-fbservice.service';
import { Institute } from 'src/app/models/institute';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Department } from 'src/app/models/department';
import { DepartmentFbserviceService } from 'src/app/services/department-fbservice.service';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationFbServiceService } from 'src/app/services/solicitation-fb-service.service';
import { User } from 'src/app/models/user';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  form_uni!: FormGroup;
  form_depto!: FormGroup;
  isSubmittedU: boolean = false;
  isSubmittedD: boolean = false;
  email!:string;
  usuario!: User | null;
  options:Institute[]=[];
  solicitationArray:Solicitation[]=[];

  constructor(private formBuilder1: FormBuilder,private formBuilder2: FormBuilder,private _router : Router,
    private institutefb: InstituteFbserviceService,private _snackBar: MatSnackBar,
    private departmentfb: DepartmentFbserviceService, private solicitationfb: SolicitationFbServiceService,
    private _userFBService: UserFBServiceService) {

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
    this.form_uni = this.formBuilder1.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required]],
    })
    this.loadInstitutes()
    this.loadSolicitations()
    this.form_depto = this.formBuilder2.group({
      idInstitute: ["", [Validators.required]],
      name: ["", [Validators.required]],
    })
  }

  async getUser(){
    this.usuario = await this._userFBService?.getUserByEmail(this.email);
    console.log(this.usuario?.name);
  }

  submitFormU(){
    this.isSubmittedU = true;
    if(!this.form_uni.valid){
      console.log("aqui");
    }else{
      console.log(this.form_uni.value)
      this.registerUni();
      this.form_uni.reset();
    }
  }

  submitFormD(){
    this.isSubmittedD = true;
    if(!this.form_depto.valid){
      console.log("aqui");
    }else{
      console.log("aqui");
      this.registerDpto();
      this.form_depto.reset();
    }
  }

  private async registerUni(){
    //let universidade: Institute = {id:'',name:this.form_uni.controls['name'].value,email:this.form_uni.controls['email'].value}
    await this.institutefb.createInstituteMaster(this.form_uni.value)/*.then(() => {
      console.log(universidade);
    })*/
  }

  async deleteSolicitation(id:string){
    await this.solicitationfb.deleteSolicitation(id);
    alert('Solicitação excluída com sucesso!');
  }

  private async registerDpto(){
    //let dpto: Department = {id:'',name:this.form_depto.controls['name'].value,idInstitute:this.form_depto.controls['idInstitute'].value}
    await this.departmentfb.createDepartmentMaster(this.form_depto.value)/*.then(() => {
      console.log(dpto);
    })*/
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  snackBarUni(){
    this.openSnackBar("Universidade Cadastrada Com Sucesso","Ok");
  }

  snackBarDpto(){
    this.openSnackBar("Departamento Cadastrado Com Sucesso","Ok");
  }

  async loadInstitutes() {
    return await this.institutefb.readInstitutes().subscribe((data: Institute[]) => {this.options = data;})
  }

  async loadSolicitations(){
    return await this.solicitationfb.readSolicitations().subscribe((data:Solicitation[])=>{this.solicitationArray = data;})
  }

  redirect() {
    this._router.navigateByUrl('/user/' + this.email,{state: {email:this.email}});
  }
}
