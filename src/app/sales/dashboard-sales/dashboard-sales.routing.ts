import { Routes } from '@angular/router';

import { DashboardSalesComponent } from './dashboard-sales.component';

export const DashboardSalesRoutes: Routes = [
  {
    path: '',
    component: DashboardSalesComponent,
	data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    }
  }
];
