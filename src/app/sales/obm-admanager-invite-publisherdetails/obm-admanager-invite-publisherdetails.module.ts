import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OBMAdManagerPublisherDetailsComponent } from './obm-admanager-invite-publisherdetails.component';
import { OBMAdManagerPublisherDetailsRoutes } from './obm-admanager-invite-publisherdetails.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(OBMAdManagerPublisherDetailsRoutes)
  ],
  declarations: [OBMAdManagerPublisherDetailsComponent]
})
export class OBMAdManagerPublisherDetailsModule {}
