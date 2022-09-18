import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpResponsiveTagComponent } from './publishertools-othertools-dfp-responsive-tag.component';

export const PublisherToolsOtherToolsDfpResponsiveTagRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpResponsiveTagComponent,
	data: {
      title: 'Tools -  Dfp Responsive',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Tools -  Dfp Responsive' }
      ]
    }
  }
];
