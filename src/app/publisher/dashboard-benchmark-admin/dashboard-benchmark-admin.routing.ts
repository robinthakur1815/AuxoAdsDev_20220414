import { Routes } from '@angular/router';

import { DashboardBenchmarkAdminComponent } from './dashboard-benchmark-admin.component';

export const DashboardBenchmarkAdminRoutes: Routes = [
  {
    path: '',
    component: DashboardBenchmarkAdminComponent,
	data: {
      title: 'Dashboard - Admin Access',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard - Admin Access' }
      ]
    }
  }
];
