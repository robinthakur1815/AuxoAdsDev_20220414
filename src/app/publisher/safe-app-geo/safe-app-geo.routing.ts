import { Routes } from '@angular/router';

import { SafeRevenueAppGeoComponent } from './safe-app-geo.component';

export const SafeRevenueAppGeoRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueAppGeoComponent,
	data: {
      title: 'Auxo Network - Apps - Geo',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Apps - Geo' }
      ]
    }
  }
];
