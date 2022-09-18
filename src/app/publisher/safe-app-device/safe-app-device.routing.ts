import { Routes } from '@angular/router';

import { SafeRevenueAppDeviceComponent } from './safe-app-device.component';

export const SafeRevenueAppDeviceRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueAppDeviceComponent,
	data: {
      title: 'Auxo Network - Apps - Device',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Apps - Device' }
      ]
    }
  }
];
