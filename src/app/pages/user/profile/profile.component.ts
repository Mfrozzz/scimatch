import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department';
import { Institute } from 'src/app/models/institute';
import { DepartmentFbserviceService } from 'src/app/services/department-fbservice.service';
import { InstituteFbserviceService } from 'src/app/services/institute-fbservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm!:FormGroup;
  imagem:any;
  isSubmitted: boolean = false;
  institutes: Institute[] = [];
  departments: Department[] = [];

  constructor(private formBuilder: FormBuilder,private departmentfb: DepartmentFbserviceService,
    private institutefb: InstituteFbserviceService){

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
    this.loadInstitutes()
    this.loadDepartments()
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.profileForm.valid){
      console.log("aqui");
    }else{
      this.edit();
    }
  }

  async loadInstitutes() {
    return await this.institutefb.readInstitutes().subscribe((data: Institute[]) => {this.institutes = data;})
  }

  async loadDepartments() {
    return await this.departmentfb.readDepartments().subscribe((data: Department[]) => {this.departments = data;})
  }

  uploadFile(imagem:any){
    this.imagem = imagem.files;
  }

  edit(){
    
  }
}
