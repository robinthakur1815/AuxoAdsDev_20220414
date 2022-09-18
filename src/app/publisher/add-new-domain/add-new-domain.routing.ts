import { Routes } from '@angular/router';

import { AddNewDomainComponent } from './add-new-domain.component';

export const AddNewDomainRoutes: Routes = [
  {
    path: '',
    component: AddNewDomainComponent,
	data: {
      title: 'Add New Domain',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Add New Domain' }
      ]
    }
  }
];
