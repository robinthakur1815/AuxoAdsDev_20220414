import { Routes } from '@angular/router';

import { OBMAdmanagerComponent } from './obm-admanager-invite.component';

export const OBMAdmanagerRoutes: Routes = [
  {
    path: '',
    component: OBMAdmanagerComponent,
	data: {
      title: 'Ad Manager Invite',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Ad Manager Invite' }
      ]
    }
  }
];
