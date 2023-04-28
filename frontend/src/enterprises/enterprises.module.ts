import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@madsis/internal/core/core.module';
import { MaintenanceTenantsRoutingModule } from './maintenance-tenants.routing';
import { MaintenanceTenantsItemComponent } from './maintenance-tenants-item/maintenance-tenants-item.component';
import { PaymentMethodsListComponent } from './payment-methods-list/payment-methods-list.component';
import { PaymentMethodsItemComponent } from './payment-methods-item/payment-methods-item.component';
import { PaymentPriorityComponent } from './payment-priority/payment-priority.component';

@NgModule({
  declarations: [MaintenanceTenantsItemComponent, PaymentMethodsListComponent, PaymentMethodsItemComponent, PaymentPriorityComponent],
  imports: [CommonModule, CoreModule, MaintenanceTenantsRoutingModule],
  entryComponents: [PaymentMethodsItemComponent],
  providers: [],
})
export class MaintenanceTenantsModule {}