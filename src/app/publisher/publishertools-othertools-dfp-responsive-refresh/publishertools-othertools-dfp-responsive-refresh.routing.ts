import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpResponsiveRefreshComponent } from './publishertools-othertools-dfp-responsive-refresh.component';

export const PublisherToolsOtherToolsDfpResponsiveRefreshRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpResponsiveRefreshComponent,
	data: {
      title: 'Publisher Tools Other Tools Dfp Responsive Refresh',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools Other Tools Dfp Responsive Refresh' }
      ]
    }
  }
];
