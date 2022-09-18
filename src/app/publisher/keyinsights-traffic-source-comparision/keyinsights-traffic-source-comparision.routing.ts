import { Routes } from '@angular/router';

import { keyinsightsTrafficSourceComparisionComponent } from './keyinsights-traffic-source-comparision.component';

export const keyinsightsTrafficSourceComparisionRoutes: Routes = [
  {
    path: '',
    component: keyinsightsTrafficSourceComparisionComponent,
	data: {
      title: 'Key Insights - Traffic Insights',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Key Insights - Traffic Insights' }
      ]
    }
  }
];
