import { Routes } from '@angular/router';

import { SalesUsersDetailedDashboardComponent } from './sales-users-detailed-dashboard.component';

export const SalesUsersDetailedDashboardRoutes: Routes = [
  {
    path: '',
    component: SalesUsersDetailedDashboardComponent,
	data: {
      title: 'User Role - User Person Detail',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'User Role - User Person Detail' }
      ]
    }
  }
];
