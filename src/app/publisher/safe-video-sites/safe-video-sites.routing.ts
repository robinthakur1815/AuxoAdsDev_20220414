import { Routes } from '@angular/router';

import { SafeRevenueVideoSitesComponent } from './safe-video-sites.component';

export const SafeRevenueVideoSitesRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueVideoSitesComponent,
	data: {
      title: 'Auxo Network - Video - Sites',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Video - Sites' }
      ]
    }
  }
];
