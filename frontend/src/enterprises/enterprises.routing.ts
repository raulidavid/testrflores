import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@madsis/external/pagenotfound/pagenotfound.component';
import { PageMode } from '@madsis/shared/enums/generic.enum';
import { LoggedinGuard, RolesPermissionsGuard } from 'common';
import { MaintenanceTenantsItemComponent } from './maintenance-tenants-item/maintenance-tenants-item.component';

const TENANTS_ROUTES: Routes = [
  {
    path: ``,
    component: MaintenanceTenantsItemComponent,
    canActivate: [LoggedinGuard, RolesPermissionsGuard],
    data: { permissions: 'MaintenanceTenant' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(TENANTS_ROUTES)],
  exports: [RouterModule],
})
export class MaintenanceTenantsRoutingModule {}
