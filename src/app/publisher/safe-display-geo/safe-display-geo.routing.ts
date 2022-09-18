import { Routes } from '@angular/router';

import { SafeRevenueDisplayGeoComponent } from './safe-display-geo.component';

export const SafeRevenueDisplayGeoRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueDisplayGeoComponent,
	data: {
      title: 'Auxo Network - Display - Geo',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Display - Geo' }
      ]
    }
  }
];
