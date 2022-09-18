import { Routes } from '@angular/router';

import { AutomatedInvoiceVideoComponent } from './automated-invoice-video.component';

export const AutomatedInvoiceVideoRoutes: Routes = [
  {
    path: '',
    component: AutomatedInvoiceVideoComponent,
	data: {
      title: 'Automated Invoice - AdX For Video',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Automated Invoice - AdX For Video' }
      ]
    }
  }
];
