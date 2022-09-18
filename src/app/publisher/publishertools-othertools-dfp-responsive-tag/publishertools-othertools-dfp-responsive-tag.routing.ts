import { Routes } from '@angular/router';

import { PublisherToolsOtherToolsDfpResponsiveTagComponent } from './publishertools-othertools-dfp-responsive-tag.component';

export const PublisherToolsOtherToolsDfpResponsiveTagRoutes: Routes = [
  {
    path: '',
    component: PublisherToolsOtherToolsDfpResponsiveTagComponent,
	data: {
      title: 'Publisher Tools Other Tools Dfp Responsive Tag',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Publisher Tools Other Tools Dfp Responsive Tag' }
      ]
    }
  }
];
