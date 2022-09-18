import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { PublisherToolsApiDocService } from './publisher-tools-api-doc.service';
import { PublisherToolsApiDocComponent } from './publisher-tools-api-doc.component';
import { PublisherToolsApiDocRoutes } from './publisher-tools-api-doc.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(PublisherToolsApiDocRoutes)
  ]
})
export class PublisherToolsApiDocModule { }
