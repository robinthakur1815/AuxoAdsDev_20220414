import { Routes } from '@angular/router';

import { NetworkPartnerComponent } from './network-partner.component';

export const NetworkPartnerRoutes: Routes = [
  {
    path: '',
    component: NetworkPartnerComponent,
	data: {
      title: 'Network Partner',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Network Partner' }
      ]
    }
  }
];
