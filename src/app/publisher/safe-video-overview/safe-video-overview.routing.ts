import { Routes } from '@angular/router';

import { SafeVideoOverviewComponent } from './safe-video-overview.component';

export const SafeVideoOverviewRoutes: Routes = [
  {
    path: '',
    component: SafeVideoOverviewComponent,
	data: {
      title: 'Auxo Network - Video - Overview',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Video - Overview' }
      ]
    }
  }
];
