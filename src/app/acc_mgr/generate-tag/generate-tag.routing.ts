import { Routes } from '@angular/router';

import { GenerateTagComponent } from './generate-tag.component';

export const GenerateTagRoutes: Routes = [
  {
    path: '',
    component: GenerateTagComponent,
	data: {
      title: 'Network Partner - Generate Tag',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Ad Manager Invite - Generate Tag' }
      ]
    }
  }
];
