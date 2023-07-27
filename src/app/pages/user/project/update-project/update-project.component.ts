import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {
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
