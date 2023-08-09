import {Component} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {NgIf, NgFor, AsyncPipe} from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstituteFbserviceService } from 'src/app/services/institute-fbservice.service';
import { Institute } from 'src/app/models/institute';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  options:Institute[]=[]
  /*options: string[] = ['UNICENTRO - Universidade Estadual do Centro Oeste',
                       'Centro Universitário UniGuairacá',
                       'Centro Universitário Campo Real',
                       'UTFPR - Guarapuava'];*/

  constructor(private formBuilder: FormBuilder,private _router : Router,
    private institutefb: InstituteFbserviceService,private _snackBar: MatSnackBar) {

  }

  ngOnInit(){
    this.form_uni = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required]],
    })
    this.loadInstitutes()
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
    }
  }

  private async registerUni(){
    let universidade: Institute = {id:'',name:this.form_uni.controls['name'].value,email:this.form_uni.controls['email'].value}
    await this.institutefb.createInstitute(universidade).then(() => {
      console.log(universidade);
    })
  }

  /*
    private async createConta() {
    let funcionario: Funcionario = {id: '', nome: this.FormCadFunc.controls['nome'].value, telefone: this.FormCadFunc.controls['telefone'].value,
    email: this.FormCadFunc.controls['email'].value, admin: this.isAdmin}

    await this.authFireService.createUser(funcionario, this.FormCadFunc.controls['senha'].value);

    this.irParaCadastro()
  }
  */

  registerDpto(){
    
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
}
