import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@madsis/external/pagenotfound/pagenotfound.component';
import { LoggedinGuard } from 'common';
import { InviteUsersItemComponent } from './inviteusers-item/inviteusers-item.component';

const INVITEUSERS_ROUTES: Routes = [
  {
    path: ``,
    component: InviteUsersItemComponent,
    canActivate: [LoggedinGuard],
    //data: { permissions: 'comercial.sales' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(INVITEUSERS_ROUTES)],
  exports: [RouterModule],
})
export class InviteUsersRoutingModule {}
