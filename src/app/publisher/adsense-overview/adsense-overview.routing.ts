import { Routes } from '@angular/router';

import { AdsenseOverviewComponent } from './adsense-overview.component';

export const AdsenseOverviewRoutes: Routes = [
  {
    path: '',
    component: AdsenseOverviewComponent,
	data: {
      title: 'AdSense - Overview',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'AdSense - Overview' }
      ]
    }
  }
];
