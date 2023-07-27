import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  tiposDoc: string[]=["TCC","Extensão","Artigo","Relatório","Monografia","Tese","Dissertação"];
  projectForm!:FormGroup;
  document:any;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(){
    this.projectForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["",[Validators.required]],
      docURL: ["",[Validators.required]]
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.projectForm.valid){
      console.log("aqui");
    }else{
      this.edit();
    }
  }

  uploadFile(document:any){
    this.document = document.files;
  }

  edit(){
    
  }
}
