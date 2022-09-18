import { Routes } from '@angular/router';

import { DirectDealComponent } from './direct-deal.component';

export const DirectDealRoutes: Routes = [
  {
    path: '',
    component: DirectDealComponent,
	data: {
      title: 'Direct Deal',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Direct Deal' }
      ]
    }
  }
];
