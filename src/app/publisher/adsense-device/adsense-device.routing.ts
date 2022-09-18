import { Routes } from '@angular/router';

import { AdsenseDeviceComponent } from './adsense-device.component';

export const AdsenseDeviceRoutes: Routes = [
  {
    path: '',
    component: AdsenseDeviceComponent,
	data: {
      title: 'AdSense - Device',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'AdSense - Device' }
      ]
    }
  }
];
