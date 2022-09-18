import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatIconModule
} from '@angular/material/icon';
import {
    MatCardModule,
} from '@angular/material/card';
import {
    MatInputModule
} from '@angular/material/input';
import {
    MatCheckboxModule
} from '@angular/material/checkbox';
import {
    MatButtonModule
} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from './error/error.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterLpComponent } from './registerlp/registerlp.component';
import { RegisterLoginComponent } from './registerlogin/registerlogin.component';
import { RegisterForgotComponent } from './registerforgot/registerforgot.component';
import { LogoutComponents } from './logout/logout.component';
import { ResetComponent } from './reset/reset.component';
import { DemoMaterialModule } from '../demo-material-module';
import { RegisterLpServicesComponent } from './registerlpservices/registerlpservices.component';
import { NgxCaptchaModule } from 'ngx-captcha';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        NgxCaptchaModule
    ],
    declarations: [
        ErrorComponent,
        LockscreenComponent,
        RegisterLpComponent,
        RegisterLoginComponent,
        RegisterForgotComponent,
        LogoutComponents,
        ResetComponent,
        RegisterLpServicesComponent
    ]
})
export class AuthenticationModule { }
