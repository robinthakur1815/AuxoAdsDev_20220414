import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { KeyinsightsAudienceOverviewComponent } from './keyinsights-audience-overview.component';
import { KeyinsightsAudienceOverviewRoutes } from './keyinsights-audience-overview.routing';
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
    RouterModule.forChild(KeyinsightsAudienceOverviewRoutes)
  ],
  declarations: [KeyinsightsAudienceOverviewComponent]
})
export class KeyinsightsAudienceOverviewModule {}
