import {Component} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {NgIf, NgFor, AsyncPipe} from '@angular/common';
import { FormControl } from '@angular/forms';

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
  myControl = new FormControl('');
  options: string[] = ['UNICENTRO - Universidade Estadual do Centro Oeste',
                       'Centro Universitário UniGuairacá',
                       'Centro Universitário Campo Real',
                       'UTFPR - Guarapuava'];



  constructor() {

  }
}
