import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AutomatedInvoiceAppComponent } from './automated-invoice-app.component';
import { AutomatedInvoiceAppRoutes } from './automated-invoice-app.routing';
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
    RouterModule.forChild(AutomatedInvoiceAppRoutes)
  ],
  declarations: [AutomatedInvoiceAppComponent]
})
export class AutomatedInvoiceAppModule {}