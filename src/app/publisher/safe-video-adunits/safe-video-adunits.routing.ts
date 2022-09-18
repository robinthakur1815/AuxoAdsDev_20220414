
import { Routes } from '@angular/router';

import { SafeRevenueVideoUnitsComponent } from './safe-video-adunits.component';

export const SafeRevenueVideoUnitsRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueVideoUnitsComponent,
	data: {
      title: 'Auxo Network - Video - Ad Units',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Video - Ad Units' }
      ]
    }
  }
];
