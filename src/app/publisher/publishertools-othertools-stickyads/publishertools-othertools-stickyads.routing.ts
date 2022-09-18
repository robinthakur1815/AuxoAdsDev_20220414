import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsStickyAdsComponent } from './publishertools-othertools-stickyads.component';

export const PublisherToolsOtherToolsStickyAdsRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsStickyAdsComponent,
	data: {
      title: 'Publisher Tools Other Tools StickyAds',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools Other Tools StickyAds' }
      ]
    }
  }
];
