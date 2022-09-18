import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AutomatedInvoiceContentComponent } from './automated-invoice-content.component';
import { AutomatedInvoiceContentRoutes } from './automated-invoice-content.routing';
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
    RouterModule.forChild(AutomatedInvoiceContentRoutes)
  ],
  declarations: [AutomatedInvoiceContentComponent]
})
export class AutomatedInvoiceContentModule {}
