import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PaymentConfirmationComponent } from './payment-confirmation.component';
import { PaymentConfirmationRoutes } from './payment-confirmation.routing';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule.forChild(PaymentConfirmationRoutes)
  ],
  declarations: [PaymentConfirmationComponent]
})
export class PaymentConfirmationModule {}
