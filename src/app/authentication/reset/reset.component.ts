import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotService } from './reset.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  submitted: boolean = false;
  passwordNotMatch: boolean = false;
  isSpinnerVisible: boolean = false;
  url: any;
  message: string;
  error: string;
  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private router: Router, private _forgotService: ForgotService) { }

  ngOnInit() {

    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required,Validators.minLength(8), this.noWhitespaceValidator])],
      cpassword: [null, Validators.compose([Validators.required,Validators.minLength(8)])]
    }, {
      validator: this.password.bind(this)
    });
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('cpassword');
    //return password === confirmPassword ? this.passwordNotMatch=false : this.passwordNotMatch=true;
    if (password === confirmPassword) {
      return this.passwordNotMatch = false;
    } else {
      formGroup.controls['cpassword'].setErrors({ 'incorrect': true });
      return this.passwordNotMatch = true;
    }

  }
  onSubmit() {
    this.submitted = true;


    this.error = '';
    this.message = '';
    if (this.form.valid) {
      this.isSpinnerVisible = true;
      
      this.url = this.router.url.split('/');

      this._forgotService.getGamData(this.url[3], this.form.value.password, this.url[4]).subscribe((response) => {

        
        if (response['status_code'] == '200') {
          this.message = response['message'];
          this.isSpinnerVisible = false;
        }

        else {
          this.error = response['message'];
          this.isSpinnerVisible = false;
        }

      })
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
