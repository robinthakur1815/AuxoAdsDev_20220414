import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OBMDashboardComponent } from './obm-dashboard.component';
import { OBMDashboardRoutes } from './obm-dashboard.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { ReplacenullwithtextPipe } from './replacenullwithtext.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(OBMDashboardRoutes)
  ],
  declarations: [OBMDashboardComponent, ReplacenullwithtextPipe]
})
export class OBMDashboardModule {}
