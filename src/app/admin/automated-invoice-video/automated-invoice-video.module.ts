import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AutomatedInvoiceVideoComponent } from './automated-invoice-video.component';
import { AutomatedInvoiceVideoRoutes } from './automated-invoice-video.routing';
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
    RouterModule.forChild(AutomatedInvoiceVideoRoutes)
  ],
  declarations: [AutomatedInvoiceVideoComponent]
})
export class AutomatedInvoiceVideoModule {}
