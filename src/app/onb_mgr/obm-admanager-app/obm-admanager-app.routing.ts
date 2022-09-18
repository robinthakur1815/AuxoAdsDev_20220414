import { Routes } from '@angular/router';

import { OBMAdmanagerAppComponent } from './obm-admanager-app.component';

export const OBMAdmanagerAppRoutes: Routes = [
  {
    path: '',
    component: OBMAdmanagerAppComponent,
	data: {
      title: 'App Status',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'App Status' }
      ]
    }
  }
];
