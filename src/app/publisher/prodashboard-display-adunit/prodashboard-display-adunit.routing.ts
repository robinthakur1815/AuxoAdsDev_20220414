import { Routes } from '@angular/router';

import { ProDashboardDisplayAdunitComponent } from './prodashboard-display-adunit.component';

export const ProDashboardDisplayAdunitRoutes: Routes = [
  {
    path: '',
    component: ProDashboardDisplayAdunitComponent,
	data: {
      title: 'Auxo Pro - Display - Ad Units',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Pro - Display - Ad Units' }
      ]
    }
  }
];
