import { Routes } from '@angular/router';

import { PublisherToolsApiDocComponent } from './publisher-tools-api-doc.component';

export const PublisherToolsApiDocRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsApiDocComponent,
	data: {
      title: 'Publisher Tools - Api.Docs',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools - Api.Docs' }
      ]
    }
  }
];
