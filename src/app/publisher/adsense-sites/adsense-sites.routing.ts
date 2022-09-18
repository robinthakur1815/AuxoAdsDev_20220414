import { Routes } from '@angular/router';

import { AdsenseSitesComponent } from './adsense-sites.component';

export const AdsenseSitesRoutes: Routes = [
  {
    path: '',
    component: AdsenseSitesComponent,
	data: {
      title: 'AdSense - Sites',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'AdSense - Sites' }
      ]
    }
  }
];
