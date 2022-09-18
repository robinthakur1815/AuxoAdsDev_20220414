import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-benchmark-admin',
  templateUrl: './dashboard-benchmark-admin.component.html',
  styleUrls: ['./dashboard-benchmark-admin.component.scss']
})

  export class DashboardBenchmarkAdminComponent  {
    public form: FormGroup = Object.create(null);
    constructor(private fb: FormBuilder, private location: Location, private router: Router) { }

    ngOnInit() {
      this.form = this.fb.group({
        uname: [null, Validators.compose([Validators.required])],
      });
    }
    backPage(){
      this.location.back();
    }
  
  }

