import { Routes } from '@angular/router';

import { NetworkSitesComponent } from './network-sites.component'; 

export const NetworkSitesRoutes: Routes = [
  {
    path: '',
    component: NetworkSitesComponent,
	data: {
      title: 'Auxo - Sites',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo - Sites' }
      ]
    }
  }
];
