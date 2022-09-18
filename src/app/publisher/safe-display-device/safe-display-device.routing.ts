import { Routes } from '@angular/router';

import { SafeRevenueDisplayDeviceComponent } from './safe-display-device.component';

export const SafeRevenueDisplayDeviceRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueDisplayDeviceComponent,
	data: {
      title: 'Auxo Network - Display - Device',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Display - Device' }
      ]
    }
  }
];
