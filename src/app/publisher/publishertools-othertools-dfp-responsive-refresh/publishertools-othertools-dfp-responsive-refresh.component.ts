import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-publishertools-othertools-dfp-responsive-refresh',
  templateUrl: './publishertools-othertools-dfp-responsive-refresh.component.html',
  styleUrls: ['./publishertools-othertools-dfp-responsive-refresh.component.scss']
})

  export class PublisherToolsOtherToolsDfpResponsiveRefreshComponent  {
    options: FormGroup;
  
    hide = true;
  
    constructor(fb: FormBuilder) {
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
  }

