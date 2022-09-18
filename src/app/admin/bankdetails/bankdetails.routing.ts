import { Routes } from '@angular/router';

import { BankDetailsComponent } from './bankdetails.component';

export const BankDetailsRoutes: Routes = [
  {
    path: '',
    component: BankDetailsComponent,
	data: {
      title: 'Network Partner - View / Update Information',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Network Partner - View / Update Information' }
      ]
    }
  }
];
