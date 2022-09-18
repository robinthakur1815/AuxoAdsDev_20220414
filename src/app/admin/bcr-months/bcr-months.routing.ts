import { Routes } from '@angular/router';

import { BCRMonthsComponent } from './bcr-months.component';

export const BCRMonthsRoutes: Routes = [
  {
    path: '',
    component: BCRMonthsComponent,
	data: {
      title: 'BCR ( Months )',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'BCR ( Months )' }
      ]
    }
  }
];
