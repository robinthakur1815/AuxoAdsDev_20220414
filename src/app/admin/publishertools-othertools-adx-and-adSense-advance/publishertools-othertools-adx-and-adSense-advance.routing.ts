import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent } from './publishertools-othertools-adx-and-adsense-advance.component';

export const PublisherToolsOtherToolsAdxAndAdsenseAdvanceRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent,
	data: {
      title: 'Tools -  AdX & Adsense Advance Responsive',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools -  AdX & Adsense Advance Responsive' }
      ]
    }
  }
];
