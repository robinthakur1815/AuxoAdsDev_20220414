import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsComponent } from './publishertools-othertools.component';

export const PublisherToolsOtherToolsRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsComponent,
	data: {
      title: 'Tools',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools' }
      ]
    }
  }
];
