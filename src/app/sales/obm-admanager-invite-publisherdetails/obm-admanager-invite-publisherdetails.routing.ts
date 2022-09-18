import { Routes } from '@angular/router';

import { OBMAdManagerPublisherDetailsComponent } from './obm-admanager-invite-publisherdetails.component';

export const OBMAdManagerPublisherDetailsRoutes: Routes = [
  {
    path: '',
    component: OBMAdManagerPublisherDetailsComponent,
	data: {
      title: 'Ad Manager Invite - Publisher Details',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Ad Manager Invite - Publisher Details' }
      ]
    }
  }
];
