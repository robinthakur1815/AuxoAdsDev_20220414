import { Routes } from '@angular/router';

import { KeyinsightsAudienceOverviewComponent } from './keyinsights-audience-overview.component';

export const KeyinsightsAudienceOverviewRoutes: Routes = [
  {
    path: '',
    component: KeyinsightsAudienceOverviewComponent,
	data: {
      title: 'Key Insights - Audience Insights',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Key Insights - Audience Insights' }
      ]
    }
  }
];
