import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpRefreshTagComponent } from './publishertools-othertools-dfp-refresh-tag.component';

export const PublisherToolsOtherToolsDfpRefreshTagRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpRefreshTagComponent,
	data: {
      title: 'Tools - DFP Refresh',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools - DFP Refresh' }
      ]
    }
  }
];
