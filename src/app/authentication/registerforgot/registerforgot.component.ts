import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotService } from './registerforgot.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-registerforgot',
  templateUrl: './registerforgot.component.html',
  styleUrls: ['./registerforgot.component.scss']
})
export class RegisterForgotComponent implements OnInit {
  submitted:boolean=false;
  isSpinnerVisible:boolean=false;
  message:string;
  error:string;
  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private router: Router,private _forgotService:ForgotService) { }

  ngOnInit() {
    
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
    });
  }

  onSubmit() {
    this.submitted = true;
    
    this.error='';
    this.message='';
    if(this.form.valid){
      this.isSpinnerVisible = true;
          this._forgotService.getGamData(this.form.value.email).subscribe((response)=>{
           
           
              if(response['status_code']=='200'){
                 
                  
                    this.message = response['data']['message'];
                    this.isSpinnerVisible = false;

                 }
              else if(response['status_code'] == '204'){
                this.error = response['data']['message'];
                this.isSpinnerVisible = false;
              }   
              else{
                  this.error = response['message'];
                  this.isSpinnerVisible = false;
                 }
              
            })   
    }
   
  }
}
