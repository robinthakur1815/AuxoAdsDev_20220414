
import { Routes } from '@angular/router';

import { SafeRevenueAppAdtypesComponent } from './safe-app-adtypes.component';

export const SafeRevenueAppAdtypesRoutes: Routes = [
  {
    path: '',
    component: SafeRevenueAppAdtypesComponent,
	data: {
      title: 'Auxo Network - Apps - Ad Types',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Auxo Network - Apps- Ad Types' }
      ]
    }
  }
];
