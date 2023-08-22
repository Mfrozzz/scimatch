import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form_cadastro!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,private _router : Router,private _userFBService: UserFBServiceService){

  }

  ngOnInit(){
    this.form_cadastro = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required]],
      academicRegister: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
    })

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_cadastro.valid){
      console.log("aqui");
    }else{
      this.register();
    }
  }

  async register(){
    await this._userFBService.registerFB(this.form_cadastro.value);

  }

}
