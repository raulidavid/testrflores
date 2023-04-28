import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@madsis/internal/core/core.module';
import { InviteUsersRoutingModule } from './inviteusers.routing';
import { InviteUsersItemComponent } from './inviteusers-item/inviteusers-item.component';

@NgModule({
  declarations: [InviteUsersItemComponent],
  imports: [CommonModule, CoreModule, InviteUsersRoutingModule],
  providers: [],
})
export class InviteUsersModule {}
