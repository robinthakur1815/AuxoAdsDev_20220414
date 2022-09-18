import { Routes } from '@angular/router';

import { AdsenseAdtypesComponent } from './adsense-adtypes.component';

export const AdsenseAdtypesRoutes: Routes = [
  {
    path: '',
    component: AdsenseAdtypesComponent,
	data: {
      title: 'AdSense - Ad Types',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'AdSense - Ad Types' }
      ]
    }
  }
];
