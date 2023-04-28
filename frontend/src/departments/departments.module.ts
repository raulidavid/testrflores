import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@madsis/internal/core/core.module';
import { AuthUsersListComponent } from './authusers-list/authusers-list.component';
import { AuthUsersItemComponent } from './authusers-item/authusers-item.component';
import { AuthUsersRoutingModule } from './authusers.routing';

@NgModule({
  declarations: [AuthUsersListComponent,AuthUsersItemComponent],
  imports: [CommonModule, CoreModule, AuthUsersRoutingModule],
  providers: [],
})
export class AuthUsersModule {}