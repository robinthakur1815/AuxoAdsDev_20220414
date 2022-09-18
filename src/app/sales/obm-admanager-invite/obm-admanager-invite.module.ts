import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OBMAdmanagerComponent } from './obm-admanager-invite.component';
import { OBMAdmanagerRoutes } from './obm-admanager-invite.routing';
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
    RouterModule.forChild(OBMAdmanagerRoutes)
  ],
  declarations: [OBMAdmanagerComponent, ReplacenullwithtextPipe]
})
export class OBMAdmanagerModule {}
