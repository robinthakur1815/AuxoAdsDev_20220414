import { Routes } from '@angular/router';

import { DashboardFinanceComponent } from './dashboard-finance.component';

export const DashboardFinanceRoutes: Routes = [
  {
    path: '',
    component: DashboardFinanceComponent,
	data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    }
  }
];
