import { Routes } from '@angular/router';

import { PublisherToolsAdsTxtComponent } from './publishertools-ads-txt.component';

export const PublisherToolsAdsTxtRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsAdsTxtComponent,
	data: {
      title: 'Publisher Tools - Ads.Docs',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools - Ads.Docs' }
      ]
    }
  }
];
