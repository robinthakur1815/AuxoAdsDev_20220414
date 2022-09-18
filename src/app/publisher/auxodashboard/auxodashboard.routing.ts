import { Routes } from '@angular/router';

import { AuxoDashboardComponent } from './auxodashboard.component';

export const AuxoDashboardRoutes: Routes = [
  {
    path: '',
    component: AuxoDashboardComponent,
	data: {
      title: 'Auxo Network',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network' }
      ]
    }
  }
];
