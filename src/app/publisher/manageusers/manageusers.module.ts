import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageUsersComponent } from './manageusers.component';
import { ManageUsersDialogContent } from './manageusers.component';

import { ManageUsersRoutes } from './manageusers.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(ManageUsersRoutes)
  ],
  declarations: [ManageUsersComponent,
    ManageUsersDialogContent]
})
export class ManageUsersModule {}
