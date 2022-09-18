import { Routes } from '@angular/router';

import { AutomatedInvoiceContentComponent } from './automated-invoice-content.component';

export const AutomatedInvoiceContentRoutes: Routes = [
  {
    path: '',
    component: AutomatedInvoiceContentComponent,
	data: {
      title: 'Automated Invoice - AdX For Content',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Automated Invoice - AdX For Content' }
      ]
    }
  }
];
