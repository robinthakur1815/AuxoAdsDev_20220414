import { Routes } from '@angular/router';

import { OBMDashboardComponent } from './obm-dashboard.component';

export const OBMDashboardRoutes: Routes = [
  {
    path: '',
    component: OBMDashboardComponent,
	data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    }
  }
];
