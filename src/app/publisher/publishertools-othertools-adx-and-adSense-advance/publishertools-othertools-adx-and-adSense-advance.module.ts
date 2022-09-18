import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent } from './publishertools-othertools-adx-and-adsense-advance.component';
import { PublisherToolsOtherToolsAdxAndAdsenseAdvanceRoutes } from './publishertools-othertools-adx-and-adsense-advance.routing';
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
    RouterModule.forChild(PublisherToolsOtherToolsAdxAndAdsenseAdvanceRoutes)
  ],
  declarations: [PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent]
})
export class PublisherToolsOtherToolsAdxAndAdsenseAdvanceModule {}
