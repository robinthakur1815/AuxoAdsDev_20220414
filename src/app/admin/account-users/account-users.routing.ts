import { Routes } from '@angular/router';

import { AccountUsersComponent } from './account-users.component';

export const AccountUsersRoutes: Routes = [
  {
    path: '',
    component: AccountUsersComponent,
	data: {
      title: 'Account Users',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Account Users' }
      ]
    }
  }
];
