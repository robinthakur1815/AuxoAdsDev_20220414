
import { Routes } from '@angular/router';

import { SafeRevenueVideoAdtypesComponent } from './safe-video-adtypes.component';

export const SafeRevenueVideoAdtypesRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueVideoAdtypesComponent,
	data: {
      title: 'Auxo Network - Video - Ad Types',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Video- Ad Types' }
      ]
    }
  }
];
