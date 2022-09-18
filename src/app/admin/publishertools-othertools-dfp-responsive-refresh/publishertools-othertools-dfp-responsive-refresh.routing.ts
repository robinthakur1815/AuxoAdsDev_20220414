import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpResponsiveRefreshComponent } from './publishertools-othertools-dfp-responsive-refresh.component';

export const PublisherToolsOtherToolsDfpResponsiveRefreshRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpResponsiveRefreshComponent,
	data: {
      title: 'Tools - DFP Responsive + Refresh',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools - DFP Responsive + Refresh' }
      ]
    }
  }
];
