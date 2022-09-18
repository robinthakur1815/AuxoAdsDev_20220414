import { Routes } from '@angular/router';

import { WebsiteSearchComponent } from './website-search.component';

export const WebsiteSearchRoutes: Routes = [
  {
    path: '',
    component: WebsiteSearchComponent,
	data: {
      title: 'Website Search',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Website Search' }
      ]
    }
  }
];
