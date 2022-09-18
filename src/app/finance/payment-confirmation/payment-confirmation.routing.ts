import { Routes } from '@angular/router';

import { PaymentConfirmationComponent } from './payment-confirmation.component';

export const PaymentConfirmationRoutes: Routes = [
  {
    path: '',
    component: PaymentConfirmationComponent,
	data: {
      title: 'Payments',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Payments' }
      ]
    }
  }
];
