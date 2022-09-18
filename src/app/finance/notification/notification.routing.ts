import { Routes } from '@angular/router';

import { NotificationsComponent } from './notification.component';

export const NotificationsRoutes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
	data: {
      title: 'Notifications Hub',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Notifications Hub' }
      ]
    }
  }
];
