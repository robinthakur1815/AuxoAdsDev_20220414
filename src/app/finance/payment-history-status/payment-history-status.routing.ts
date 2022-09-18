import { Routes } from '@angular/router';

import { PaymentHistoryStatusComponent } from './payment-history-status.component';

export const PaymentHistoryStatusRoutes: Routes = [
  {
    path: '',
    component: PaymentHistoryStatusComponent,
	data: {
      title: 'Payments - View Payments History',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Payments - View Payments History' }
      ]
    }
  }
];
