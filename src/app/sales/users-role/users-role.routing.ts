import { Routes } from '@angular/router';

import { SalesUsersComponent } from './users-role.component';

export const SalesUsersRoutes: Routes = [
  {
    path: '',
    component: SalesUsersComponent,
	data: {
      title: 'User Role',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'User Role' }
      ]
    }
  }
];
