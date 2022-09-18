import { Routes } from '@angular/router';

import { OBMAdManagerPublisherDetailsComponent } from './obm-admanager-app-publisherdetails.component';

export const OBMAdManagerPublisherDetailsRoutes: Routes = [
  {
    path: '',
    component: OBMAdManagerPublisherDetailsComponent,
	data: {
      title: 'App Status - Publisher Details',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'App Status - Publisher Details' }
      ]
    }
  }
];
