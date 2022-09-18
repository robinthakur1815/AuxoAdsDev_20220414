import { Routes } from '@angular/router';

import { SafeRevenueVideoDeviceComponent } from './safe-video-device.component';

export const SafeRevenueVideoDeviceRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueVideoDeviceComponent,
	data: {
      title: 'Auxo Network - Video - Device',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Video - Device' }
      ]
    }
  }
];
