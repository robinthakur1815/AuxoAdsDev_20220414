import { Routes } from '@angular/router';

import { SalesNetworkPartnerComponent } from './sales-publisher-list.component';

export const SalesNetworkPartnerRoutes: Routes = [
  {
    path: '',
    component: SalesNetworkPartnerComponent,
	data: {
      title: 'Publisher List',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher List' }
      ]
    }
  }
];
