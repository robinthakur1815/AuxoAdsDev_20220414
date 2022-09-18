import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent } from './publishertools-othertools-adx-and-adsense-advance.component';

export const PublisherToolsOtherToolsAdxAndAdsenseAdvanceRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent,
	data: {
      title: 'Publisher Tools Other Tools Adx And Adsense Advance',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools Other Tools Adx And Adsense Advance' }
      ]
    }
  }
];
