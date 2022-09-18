import { Routes } from '@angular/router';

import { PixelTrackingTagComponent } from './pexel-tracking-tag.component';

export const PixelTrackingTagRoutes: Routes = [
  {
    path: '',
    component: PixelTrackingTagComponent,
	data: {
      title: 'Network Partner - Pixel Tracking Tag',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Ad Manager Invite - Pixel Tracking Tag' }
      ]
    }
  }
];
