import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OBMAdmanagerDomainComponent } from './obm-admanager-domain.component';
import { OBMAdmanagerDomainRoutes } from './obm-admanager-domain.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';
import { ReplacenullwithtextPipe } from './replacenullwithtext.pipe';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(OBMAdmanagerDomainRoutes)
  ],
  declarations: [OBMAdmanagerDomainComponent, ReplacenullwithtextPipe]
})
export class OBMAdmanagerDomainModule {}
