import { Routes } from '@angular/router';

import { SafeAppOverviewComponent } from './safe-app-overview.component';

export const SafeAppOverviewRoutes: Routes = [
  {
    path: '',
    component: SafeAppOverviewComponent,
	data: {
      title: 'Auxo Network - Apps - Overview',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Apps - Overview' }
      ]
    }
  }
];
