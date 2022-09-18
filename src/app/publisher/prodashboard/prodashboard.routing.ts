import { Routes } from '@angular/router';

import { ProDashboardComponent } from './prodashboard.component';

export const ProDashboardRoutes: Routes = [
  {
    path: '',
    component: ProDashboardComponent,
	data: {
      title: 'Auxo Pro',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Pro' }
      ]
    }
  }
];
