import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationFbServiceService } from 'src/app/services/solicitation-fb-service.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  solicitationForm!:FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,private solicitationfb: SolicitationFbServiceService){

  }

  ngOnInit(){
    this.solicitationForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.solicitationForm.valid){
      console.log("aqui");
    }else{
      this.execute();
    }
  }

  private async execute(){
    let solicitation: Solicitation = {id:'',title:this.solicitationForm.controls['title'].value,description:this.solicitationForm.controls['description'].value}
    await this.solicitationfb.createSolicitation(solicitation).then(() => {
      console.log(solicitation);
    })
  }
}
