import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpStickyAdsComponent } from './publishertools-othertools-dfp-sticky-ads.component';

export const PublisherToolsOtherToolsDfpStickyAdsRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpStickyAdsComponent,
	data: {
      title: 'Tools - DFP Sticky Ads',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools - DFP Sticky Ads' }
      ]
    }
  }
];
