import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFBServiceService } from 'src/app/services/user-fbservice.service';

@Component({
  selector: 'app-forgot-password2',
  templateUrl: './forgot-password2.component.html',
  styleUrls: ['./forgot-password2.component.css']
})
export class ForgotPassword2Component {
  form_login!: FormGroup;
  constructor(private formBuilder: FormBuilder,private _router : Router,private _userFBService: UserFBServiceService){

  }
  ngOnInit(){
    this.form_login = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  submitForm(){
    this._router.navigate(['/login'])
  }
}
//não usado