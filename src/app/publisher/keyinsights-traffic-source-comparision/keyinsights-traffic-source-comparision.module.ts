import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { keyinsightsTrafficSourceComparisionComponent } from './keyinsights-traffic-source-comparision.component';
import { keyinsightsTrafficSourceComparisionRoutes } from './keyinsights-traffic-source-comparision.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { UiTourModule } from '../ui-tour/ui-tour.module';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
    UiTourModule,
    HighchartsChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(keyinsightsTrafficSourceComparisionRoutes)
  ],
  declarations: [keyinsightsTrafficSourceComparisionComponent]
})
export class keyinsightsTrafficSourceComparisionModule {}
