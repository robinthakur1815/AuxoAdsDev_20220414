import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterLpComponent } from './registerlp/registerlp.component';
import { RegisterLoginComponent } from './registerlogin/registerlogin.component';
import { RegisterForgotComponent } from './registerforgot/registerforgot.component';
import { LogoutComponents } from './logout/logout.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterLpServicesComponent } from './registerlpservices/registerlpservices.component'; 
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: ErrorComponent
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent
      },
      {
        path: 'registerlp',
        component: RegisterLpComponent
      },
      {
        path: 'login',
        component: RegisterLoginComponent
      },
      {
        path: 'forgot',
        component: RegisterForgotComponent
      },
      {
        path: 'reset/:uid/:vrfystring',
        component: ResetComponent
      }, 
      {
        path: 'publisher-services/:id',
        component: RegisterLpServicesComponent
      }
      
    ]
  }
];
