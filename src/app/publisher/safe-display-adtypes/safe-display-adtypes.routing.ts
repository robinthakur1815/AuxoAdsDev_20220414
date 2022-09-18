import { Routes } from '@angular/router';

import { SafeRevenueDisplayAdtypesComponent } from './safe-display-adtypes.component';

export const SafeRevenueDisplayAdtypesRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueDisplayAdtypesComponent,
	data: {
      title: 'Auxo Network - Display - Ad Types',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Display - Ad Types' }
      ]
    }
  }
];
