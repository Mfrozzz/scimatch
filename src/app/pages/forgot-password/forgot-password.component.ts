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

  form_login!: FormGroup;

  constructor(private formBuilder: FormBuilder,private _router : Router,private _userFBService: UserFBServiceService){

  }

  ngOnInit(){
    this.form_login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  goTo2Phase(){
    let email = this.form_login.controls['email'].value
    this._router.navigateByUrl('/forgotPassword/'+email,{state: {email:email}})
  }

  submitForm(){
    ////////
    this.goTo2Phase();
  }
}
