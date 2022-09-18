import { Routes } from '@angular/router';

import { SafeRevenueDisplayUnitsComponent } from './safe-display-adunits.component';

export const SafeRevenueDisplayUnitsRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueDisplayUnitsComponent,
	data: {
      title: 'Auxo Network - Display - Ad Units',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Display - Ad Units' }
      ]
    }
  }
];
