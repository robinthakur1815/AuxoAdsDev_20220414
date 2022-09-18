import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OBMAdManagerPublisherDetailsComponent } from './obm-admanager-domain-publisherdetails.component';
import { OBMAdManagerPublisherDetailsRoutes } from './obm-admanager-domain-publisherdetails.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(OBMAdManagerPublisherDetailsRoutes)
  ],
  declarations: [OBMAdManagerPublisherDetailsComponent]
})
export class OBMAdManagerPublisherDetailsModule {}
