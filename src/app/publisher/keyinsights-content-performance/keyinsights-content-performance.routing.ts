import { Routes } from '@angular/router';

import { KeyinsightsContentPerformanceComponent } from './keyinsights-content-performance.component';

export const KeyinsightsContentPerformanceRoutes: Routes = [
  {
    path: '',
    component: KeyinsightsContentPerformanceComponent,
	data: {
      title: 'Key Insights - Content Insights',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Key Insights - Content Insights' }
      ]
    }
  }
];
