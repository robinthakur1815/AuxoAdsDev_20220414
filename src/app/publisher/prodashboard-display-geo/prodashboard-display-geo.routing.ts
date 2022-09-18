import { Routes } from '@angular/router';

import { ProDashboardDisplayGeoComponent } from './prodashboard-display-geo.component';

export const ProDashboardDisplayGeoRoutes: Routes = [
  {
    path: '',
    component: ProDashboardDisplayGeoComponent,
	data: {
      title: 'Auxo Pro - Display - Geo',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Pro - Display - Geo' }
      ]
    }
  }
];
