import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsComponent } from './publishertools-othertools.component';

export const PublisherToolsOtherToolsRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsComponent,
	data: {
      title: 'Publisher Tools - Other Tools',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools - Other Tools' }
      ]
    }
  }
];
