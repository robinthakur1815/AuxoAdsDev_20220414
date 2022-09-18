import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { SafeRevenueAppSitesComponent } from './safe-app-sites.component';
import { SafeRevenueAppSitesRoutes } from './safe-app-sites.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { UiTourModule } from '../ui-tour/ui-tour.module';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    UiTourModule,
    FormsModule,
    HighchartsChartModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(SafeRevenueAppSitesRoutes)
  ],
  declarations: [SafeRevenueAppSitesComponent]
})
export class SafeRevenueAppSitesModule {}