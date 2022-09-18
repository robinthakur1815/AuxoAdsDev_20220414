import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpRefreshTagComponent } from './publishertools-othertools-dfp-refresh-tag.component';

export const PublisherToolsOtherToolsDfpRefreshTagRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpRefreshTagComponent,
	data: {
      title: 'Publisher Tools Other Tools Dfp Refresh Tag',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools Other Tools Dfp Refresh Tag' }
      ]
    }
  }
];
