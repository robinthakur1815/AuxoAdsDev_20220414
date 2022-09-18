import { Routes } from '@angular/router';

import { NetworkPartnerProfileComponent } from './network-partner-profile.component';

export const NetworkPartnerProfileRoutes: Routes = [
  {
    path: '',
    component: NetworkPartnerProfileComponent,
	data: {
      title: 'Network Partner - View / Update Profile',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Ad Manager Invite - View / Update Profile' }
      ]
    }
  }
];
