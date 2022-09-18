import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { PublisherToolsOtherToolsDfpStickyAdsComponent } from './publishertools-othertools-dfp-sticky-ads.component';
import { PublisherToolsOtherToolsDfpStickyAdsRoutes } from './publishertools-othertools-dfp-sticky-ads.routing';
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
    RouterModule.forChild(PublisherToolsOtherToolsDfpStickyAdsRoutes)
  ],
  declarations: [PublisherToolsOtherToolsDfpStickyAdsComponent]
})
export class PublisherToolsOtherToolsDfpStickyAdsModule {}
