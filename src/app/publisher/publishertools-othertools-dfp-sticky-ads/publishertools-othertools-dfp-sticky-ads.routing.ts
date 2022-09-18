import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpStickyAdsComponent } from './publishertools-othertools-dfp-sticky-ads.component';

export const PublisherToolsOtherToolsDfpStickyAdsRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpStickyAdsComponent,
	data: {
      title: 'Publisher Tools Other Tools Dfp StickyAds',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools Other Tools Dfp StickyAds' }
      ]
    }
  }
];
