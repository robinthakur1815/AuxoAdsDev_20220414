import { Routes } from '@angular/router';

import { DirectDealViewComponent } from './direct-deal-view.component';

export const DirectDealViewRoutes: Routes = [
  {
    path: '',
    component: DirectDealViewComponent,
	data: {
      title: 'Direct Deal - View',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Direct Deal - View' }
      ]
    }
  }
];
