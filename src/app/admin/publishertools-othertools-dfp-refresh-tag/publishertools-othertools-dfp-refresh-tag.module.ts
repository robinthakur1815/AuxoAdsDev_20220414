import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { PublisherToolsOtherToolsDfpRefreshTagComponent } from './publishertools-othertools-dfp-refresh-tag.component';
import { PublisherToolsOtherToolsDfpRefreshTagRoutes } from './publishertools-othertools-dfp-refresh-tag.routing';
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
    RouterModule.forChild(PublisherToolsOtherToolsDfpRefreshTagRoutes)
  ],
  declarations: [PublisherToolsOtherToolsDfpRefreshTagComponent]
})
export class PublisherToolsOtherToolsDfpRefreshTagModule {}
