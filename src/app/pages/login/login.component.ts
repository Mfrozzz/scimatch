import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor() {
  }

  ngOnInit() {

  }

  goToRegister(){
    console.log("register")
  }

}
