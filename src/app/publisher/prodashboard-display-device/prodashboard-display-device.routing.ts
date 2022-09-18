import { Routes } from '@angular/router';

import { ProDashboardDisplayDeviceComponent } from './prodashboard-display-device.component';

export const ProDashboardDisplayDeviceRoutes: Routes = [
  {
    path: '',
    component: ProDashboardDisplayDeviceComponent,
	data: {
      title: 'Auxo Pro - Display - Device',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Pro - Display - Device' }
      ]
    }
  }
];
