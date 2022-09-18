import { Routes } from '@angular/router';

import { NetworkRevenueDisplayMobileOsComponent } from './network-revenue-display-mobileos.component';

export const NetworkRevenueDisplayMobileOsRoutes: Routes = [
  {
    path: '',
    component: NetworkRevenueDisplayMobileOsComponent,
	data: {
      title: 'Auxo Ads Network - Display - MobileOs',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Ads Network - Display - MobileOs' }
      ]
    }
  }
];
