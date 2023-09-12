import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  isSubmitted: boolean = false;
  form_login!: FormGroup;

  constructor(private formBuilder: FormBuilder,private _router : Router,private _userFBService: UserFBServiceService){

  }

  ngOnInit(){
    this.form_login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  submitForm(){
    ////////
    let e = this.form_login.controls['email'].value
    console.log(e)
    this.isSubmitted = true;
    if(!this.form_login.valid){
      alert("E-mail inválido")
    }else{
      this._userFBService.forgotPassword1(e);
      this._router.navigate(['/login']);
    }
  }
}
