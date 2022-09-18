import { Routes } from '@angular/router';

import { OBMAdmanagerDomainComponent } from './obm-admanager-domain.component';

export const OBMAdmanagerDomainRoutes: Routes = [
  {
    path: '',
    component: OBMAdmanagerDomainComponent,
	data: {
      title: 'Domain Status',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Domain Status' }
      ]
    }
  }
];
