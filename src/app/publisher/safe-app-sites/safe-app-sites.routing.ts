import { Routes } from '@angular/router';

import { SafeRevenueAppSitesComponent } from './safe-app-sites.component';

export const SafeRevenueAppSitesRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueAppSitesComponent,
	data: {
      title: 'Auxo Network - Apps - App-wise',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Apps - App-wise' }
      ]
    }
  }
];
