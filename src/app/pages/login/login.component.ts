import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { Router } from '@angular/router';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form_login!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,private _router : Router,private _userFBService: UserFBServiceService){

  }

  ngOnInit(){
    this.form_login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_login.valid){
      console.log("aqui");
    }else{
      this.login();
    }
  }

  async login(){
    await this._userFBService.loginFB(this.form_login.value['email'],this.form_login.value['password']).then(()=>{
      let email = this.form_login.controls['email'].value
      console.log(email)
      this.form_login.reset();
      this._router.navigateByUrl('/user/' + email,{state: {email:email}});
    }).catch((error) => {
      alert("Ocorreu um erro durante o cadastro, tente novamente!")
      return error
    })

  }

}
