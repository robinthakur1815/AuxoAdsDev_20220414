import { Routes } from '@angular/router';

import { PublisherToolsAdsTxtComponent } from './publishertools-ads-txt.component';

export const PublisherToolsAdsTxtRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsAdsTxtComponent,
	data: {
      title: 'Publisher Tools - Ads.Txt',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools - Ads.Txt' }
      ]
    }
  }
];
