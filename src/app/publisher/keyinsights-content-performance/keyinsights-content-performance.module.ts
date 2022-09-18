import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { KeyinsightsContentPerformanceComponent } from './keyinsights-content-performance.component';
import { KeyinsightsContentPerformanceRoutes } from './keyinsights-content-performance.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';

import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
HC_map(Highcharts);

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(KeyinsightsContentPerformanceRoutes)
  ],
  declarations: [KeyinsightsContentPerformanceComponent]
})
export class KeyinsightsContentPerformanceModule {}
