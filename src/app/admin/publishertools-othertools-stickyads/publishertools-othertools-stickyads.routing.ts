import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsStickyAdsComponent } from './publishertools-othertools-stickyads.component';

export const PublisherToolsOtherToolsStickyAdsRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsStickyAdsComponent,
	data: {
      title: 'Tools - AdX Sticky Ads',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools - AdX Sticky Ads' }
      ]
    }
  }
];
