import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-publishertools-othertools-stickyads',
  templateUrl: './publishertools-othertools-stickyads.component.html',
  styleUrls: ['./publishertools-othertools-stickyads.component.scss']
})

  export class PublisherToolsOtherToolsStickyAdsComponent  {
    options: FormGroup;
  
    hide = true;
  
    constructor(fb: FormBuilder, private location: Location) {
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
        color: 'primary',
        fontSize: [16, Validators.min(10)]
      });
    }
  
    email = new FormControl('', [Validators.required, Validators.email]);
  
    getErrorMessage() {
      return this.email.hasError('required')
        ? 'You must enter a value'
        : this.email.hasError('email')
          ? 'Not a valid email'
          : '';
    }
  
    getFontSize() {
      return Math.max(10, this.options.value.fontSize);
    }
    backPage(){
      this.location.back();
    }
  }

