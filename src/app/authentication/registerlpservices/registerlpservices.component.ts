import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterLpPubService } from './registerlpservices.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from '../../publisher/dialog-dynamic/dialog-dynamic.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray, 
  FormControl 
} from '@angular/forms';


@Component({
  selector: 'app-registerlpservices',
  templateUrl: './registerlpservices.component.html',
  styleUrls: ['./registerlpservices.component.scss']
})
export class RegisterLpServicesComponent implements OnInit {
  servicesData = [];
  url:any;
  drop:boolean=true;
  other:boolean=false;
  submitted:boolean=false;
  isSpinnerVisible:boolean=false;
  error:string;
  message:string;
  accepted:boolean=true;
  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private router: Router,private _registerPubService:RegisterLpPubService, public dialog: MatDialog) { }

  ngOnInit() {
    this.isSpinnerVisible=true;
    //services api code
     this._registerPubService.getPubServices().subscribe((response)=>{
          
          
            if(response['status_code']=='200'){
                 this.servicesData = response['data'];
                  this.isSpinnerVisible=false;
                 }else{
                  alert("Something went wrong");
                  this.isSpinnerVisible=false;
                 }
               
           
            
          })


    //form validation
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      othertext: [null]
    });
    // scroll on top start
    window.scrollTo(0, 0)
    // scroll on top End
    this._patchValues();
  }

 dropChange(e) {
       
    if(e.target.checked){
             if(e.target.value==1){

                this.drop = true;
             }
            if(e.target.value==9){

                this.other = true;
             }
          }else{

          if(e.target.value==1){

                this.drop = false;
                this.accepted=false; //unchecked child

             }
           if(e.target.value==9){

                this.other = false;
             }
        }
      
    }

private _patchValues() {
    // get array control
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    const checkedDefault = [1, 2, 3,4,5];
    checkedDefault.forEach((value) => {
      checkArray.push(new FormControl(value));
    });
    
  }
 onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
   
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {

      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          
          return;
        }
        i++;
      });
    }
  }
     
onSubmit() {
    this.submitted = true;
    this.error='';
    this.message='';
    
if(this.form.valid){
      this.isSpinnerVisible = true;
      
    this.url = this.router.url.split( '/' );
     
    this._registerPubService.postSerData(this.form.value.checkArray,this.url[3],this.form.value.othertext).subscribe((response)=>{
           
           
            if(response['status_code']=='201'){

              this.isSpinnerVisible = false;
              this.message = "Thank you for registering on Auxo Ads! Please login to start your monetization.";
              this.dialog.open(DialogDynamicComponent,
                {
                  width: '450px',
                  data: {message:this.message}
                });
              
               setTimeout(()=>{                           
                   this.router.navigate(['/authentication/login']);
                   }, 5000);   
              }
              else{
                  this.error = response['message'];
                  this.isSpinnerVisible = false;
                 }
            
          })
    }
   
  }

}
