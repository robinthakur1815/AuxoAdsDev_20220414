
import { Routes } from '@angular/router';

import { SafeRevenueAppUnitsComponent } from './safe-app-adunits.component';

export const SafeRevenueAppUnitsRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueAppUnitsComponent,
	data: {
      title: 'Auxo Network - Apps - Ad Units',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Apps - Ad Units' }
      ]
    }
  }
];
