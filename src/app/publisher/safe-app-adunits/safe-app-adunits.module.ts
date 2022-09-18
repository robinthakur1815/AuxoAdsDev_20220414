import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { SafeRevenueAppUnitsComponent } from './safe-app-adunits.component';
import { SafeRevenueAppUnitsRoutes } from './safe-app-adunits.routing';
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
    RouterModule.forChild(SafeRevenueAppUnitsRoutes)
  ],
  declarations: [SafeRevenueAppUnitsComponent]
})
export class SafeRevenueAppUnitsModule {}