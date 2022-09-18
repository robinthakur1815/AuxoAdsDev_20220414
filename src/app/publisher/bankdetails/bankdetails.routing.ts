import { Routes } from '@angular/router';

import { BankDetailsComponent } from './bankdetails.component';

export const BankDetailsRoutes: Routes = [
  {
    path: '',
    component: BankDetailsComponent,
	data: {
      title: 'Bank Details',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Bank Details' }
      ]
    }
  }
];
