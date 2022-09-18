import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AdsenseDeviceComponent } from './adsense-device.component';
import { AdsenseDeviceRoutes } from './adsense-device.routing';
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
    UiTourModule,
    HighchartsChartModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(AdsenseDeviceRoutes)
  ],
  declarations: [AdsenseDeviceComponent]
})
export class AdsenseDeviceModule {}