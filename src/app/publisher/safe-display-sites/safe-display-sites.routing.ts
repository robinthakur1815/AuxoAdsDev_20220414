import { Routes } from '@angular/router';

import { SafeRevenueDisplaySitesComponent } from './safe-display-sites.component';

export const SafeRevenueDisplaySitesRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueDisplaySitesComponent,
	data: {
      title: 'Auxo Network - Display - Sites',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Display - Sites' }
      ]
    }
  }
];
