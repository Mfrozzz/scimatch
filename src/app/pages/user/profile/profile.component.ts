import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Institute } from 'src/app/models/institute';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm!:FormGroup;
  uniNotFound: string = "notFound";
  imagem:any;
  isSubmitted: boolean = false;
  institutes: string[] = ['UNICENTRO - Universidade Estadual do Centro Oeste',
                       'Centro Universitário UniGuairacá',
                       'Centro Universitário Campo Real',
                       'UTFPR - Guarapuava'];
  departments: string[] = ['DECOMP','DEMED',
                       'DEFISIO','DEFIS',
                       'DEAGRO','DECS',
                       'DEBIO','DEGEO'];

  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(){
    this.profileForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required]],
      academicRegister: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(11)]],
      institute: ["",[Validators.required]],
      department: ["",[Validators.required]],
      city: ["", [Validators.required]],
      photoURL: ["",[Validators.required]]
    })

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.profileForm.valid){
      console.log("aqui");
    }else{
      this.edit();
    }
  }

  uploadFile(imagem:any){
    this.imagem = imagem.files;
  }

  edit(){
    
  }
}
