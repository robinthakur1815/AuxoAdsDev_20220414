import { Routes } from '@angular/router';

import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

import { OkDialogComponent } from './edit-invoice/ok-dialog/ok-dialog.component';
import { AddedDialogComponent } from './add-invoice/added-dialog/added-dialog.component';


// export const InvoiceRoutes: Routes = [
//   {
//     path: '',
//     component: InvoiceListComponent,
// 	data: {
//       title: 'Invoice',
//       urls: [
//         { title: 'Dashboard', url: '/dashboard' },
//         { title: 'Invoice' }
//       ]
//     }
//   }
// ];


export const InvoiceRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InvoiceListComponent,
		data: {
          title: 'Invoice List',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Invoice List' }
          ]
        }
      },
      {
        path: 'viewInvoice/:id',
        component: InvoiceViewComponent,
		data: {
          title: 'Invoice View',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Invoice View' }
          ]
        }
      },
      {
        path: '',
        component: AddInvoiceComponent,
		data: {
          title: 'Add Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Add Invoice' }
          ]
        }
      },

      {
        path: '',
        component: EditInvoiceComponent,
		data: {
          title: 'Edit Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Edit Invoice' }
          ]
        }
      },

      {
        path: '',
        component: OkDialogComponent,
		data: {
          title: 'OkDialog',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'OkDialog' }
          ]
        }
      },

      {
        path: '',
        component: AddedDialogComponent,
		data: {
          title: 'Added Dialog',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Added Dialog' }
          ]
        }
      }
    ]
  }
];
 