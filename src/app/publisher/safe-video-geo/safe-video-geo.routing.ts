import { Routes } from '@angular/router';

import { SafeRevenueVideoGeoComponent } from './safe-video-geo.component';

export const SafeRevenueVideoGeoRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueVideoGeoComponent,
	data: {
      title: 'Auxo Network - Video - Geo',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Video - Geo' }
      ]
    }
  }
];
