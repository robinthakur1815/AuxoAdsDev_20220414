import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BankDetailsComponent,DialogOverviewExampleBankDetailsComponent } from './bankdetails.component';
import { BankDetailsRoutes } from './bankdetails.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    RouterModule.forChild(BankDetailsRoutes)
  ],
  declarations: [BankDetailsComponent,DialogOverviewExampleBankDetailsComponent]
})
export class BankDetailsModule {}
