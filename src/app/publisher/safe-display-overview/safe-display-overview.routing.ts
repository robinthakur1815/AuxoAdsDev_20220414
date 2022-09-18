import { Routes } from '@angular/router';

import { SafeDisplayOverviewComponent } from './safe-display-overview.component'; 

export const mcmDisplayOverviewRoutes: Routes = [
  {
    path: '',
    component: SafeDisplayOverviewComponent,
	data: {
      title: 'Auxo Network - Display - Overview',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Display - Overview' }
      ]
    }
  }
];
