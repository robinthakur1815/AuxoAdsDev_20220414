import { Routes } from '@angular/router';

import { AutomatedInvoiceAppComponent } from './automated-invoice-app.component';

export const AutomatedInvoiceAppRoutes: Routes = [
  {
    path: '',
    component: AutomatedInvoiceAppComponent,
	data: {
      title: 'Automated Invoice - AdX For App',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Automated Invoice - AdX For App' }
      ]
    }
  }
];
