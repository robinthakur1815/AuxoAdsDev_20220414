import { Routes } from '@angular/router';

import { OBMAdManagerPublisherDetailsComponent } from './obm-admanager-domain-publisherdetails.component';

export const OBMAdManagerPublisherDetailsRoutes: Routes = [
  {
    path: '',
    component: OBMAdManagerPublisherDetailsComponent,
	data: {
      title: 'Domain Status - Publisher Details',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Domain Status - Publisher Details' }
      ]
    }
  }
];
