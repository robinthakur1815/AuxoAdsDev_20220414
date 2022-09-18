import { Routes } from '@angular/router';

import { PaymentHistoryComponent } from './payment-history.component';

export const PaymentHistoryRoutes: Routes = [
  {
    path: '',
    component: PaymentHistoryComponent,
	data: {
      title: 'Payments - Payments History',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Payments - Payment History' }
      ]
    }
  }
];
