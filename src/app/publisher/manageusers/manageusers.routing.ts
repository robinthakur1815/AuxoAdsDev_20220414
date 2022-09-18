import { Routes } from '@angular/router';

import { ManageUsersComponent } from './manageusers.component';

export const ManageUsersRoutes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
	data: {
      title: 'Manage Users',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Manage Users' }
      ]
    }
  }
];
