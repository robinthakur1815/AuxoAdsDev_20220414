import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { NetworkRevenueDisplayMobileOsComponent } from './network-revenue-display-mobileos.component';
import { NetworkRevenueDisplayMobileOsRoutes } from './network-revenue-display-mobileos.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HighchartsChartModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(NetworkRevenueDisplayMobileOsRoutes)
  ],
  declarations: [NetworkRevenueDisplayMobileOsComponent]
})
export class NetworkRevenueDisplayMobileOsModule {}