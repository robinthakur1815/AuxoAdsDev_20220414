import { Routes } from '@angular/router';

import { ProDashboardDisplayOverviewComponent } from './prodashboard-display-overview.component';

export const ProDashboardDisplayOverviewRoutes: Routes = [
  {
    path: '',
    component: ProDashboardDisplayOverviewComponent,
	data: {
      title: 'Auxo Pro - Display - Overview',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Pro - Display - Overview' }
      ]
    }
  }
];
