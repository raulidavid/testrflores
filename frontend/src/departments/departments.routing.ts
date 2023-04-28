import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@madsis/external/pagenotfound/pagenotfound.component';
import { PageMode } from '@madsis/shared/enums/generic.enum';
import { LoggedinGuard, RolesPermissionsGuard } from 'common';
import { AuthUsersItemComponent } from './authusers-item/authusers-item.component';
import { AuthUsersListComponent } from './authusers-list/authusers-list.component';

const AUTHUSERS_ROUTES: Routes = [
  {
    path: ``,
    component: AuthUsersListComponent,
    canActivate: [LoggedinGuard, RolesPermissionsGuard],
    data: { permissions: 'UserRead' },
  },
  {
    path: `:userId/view`,
    component: AuthUsersItemComponent,
    canActivate: [LoggedinGuard, RolesPermissionsGuard],
    data: { pageMode: PageMode.View, permissions: 'UserRead' },
  },
  {
    path: `:userId/edit`,
    component: AuthUsersItemComponent,
    canActivate: [LoggedinGuard, RolesPermissionsGuard],
    data: { pageMode: PageMode.Edit, permissions: 'UserChange' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(AUTHUSERS_ROUTES)],
  exports: [RouterModule],
})
export class AuthUsersRoutingModule {}
