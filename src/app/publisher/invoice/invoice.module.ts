import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

import { OkDialogComponent } from './edit-invoice/ok-dialog/ok-dialog.component';
import { AddedDialogComponent } from './add-invoice/added-dialog/added-dialog.component';
import { InvoiceRoutes } from './invoice.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(InvoiceRoutes)
  ],
  declarations: [ InvoiceListComponent,
    InvoiceViewComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    OkDialogComponent,
    AddedDialogComponent]
})
export class InvoiceModule {}
