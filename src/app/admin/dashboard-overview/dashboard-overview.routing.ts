import { Routes } from '@angular/router';

import { DashboardOverviewComponent } from './dashboard-overview.component';

export const DashboardOverviewRoutes: Routes = [
  {
    path: '',
    component: DashboardOverviewComponent,
	data: {
      title: 'Overview',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Overview' }
      ]
    }
  }
];
