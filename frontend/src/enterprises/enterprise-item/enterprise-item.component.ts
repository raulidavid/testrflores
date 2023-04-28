import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@madsis/internal/core/components/app-component-base';
import { BreadcrumbItem } from '@madsis/internal/core/components/sub-header/sub-header.component';
import { RouterNavigatorService } from '@madsis/internal/core/services/router-navigator.service';
import { AdministrationRoutesEnum } from '@madsis/shared/enums/administration.routes.enum';
import { PageMode } from '@madsis/shared/enums/generic.enum';
import { ModulesRoutesEnum } from '@madsis/shared/enums/modules-routes.enum';
import { AuthUserDisplay, appModuleAnimation } from 'common';
import { Subscription } from "rxjs";
import { SweetAlertOptions } from "sweetalert2";
import { PaymentMethodsItemComponent } from "../payment-methods-item/payment-methods-item.component";
import { PaymentMethodsListComponent } from "../payment-methods-list/payment-methods-list.component";
/**
 * Main component for the Roles submodule's Add/Edit/View page
 * https://stackblitz.com/edit/virtual-scrolling-selection-list?file=src%2Fapp%2Flist-selection-example.ts,src%2Fapp%2Fmaterial-module.ts
 */
@Component({
  selector: "maintenance-tenants-item",
  templateUrl: "./maintenance-tenants-item.component.html",
  styleUrls: ["./maintenance-tenants-item.component.scss"],
  animations: [appModuleAnimation()],
})

export class MaintenanceTenantsItemComponent extends AppComponentBase implements OnInit {
  subscriptions: Subscription[] = [];
  @ViewChild("PaymentMethodsList") paymentMethodsList = {} as PaymentMethodsListComponent;

  breadcrumbs: BreadcrumbItem[] = [
    new BreadcrumbItem("Administración", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}`),
    new BreadcrumbItem("Mantenimiento Empresas", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}/${AdministrationRoutesEnum.maintenancetenants}`),
  ];
  isLoading: boolean = false;
  pageMode!: PageMode;
  _sweetOptions = {} as SweetAlertOptions;
  isRateLimitReached = false;
  dataSource: MatTableDataSource<AuthUserDisplay> = new MatTableDataSource();
  displayedColumns: string[] = [
    'action',
    'userName',
    'email',
    'userId',
    'hasTenant',
    'tenantName',
    'displayedColumns',
  ];


  /**
   * Base constructor
   */
  constructor(
    _injector: Injector,
    private _activatedRoute: ActivatedRoute,
    private _router: RouterNavigatorService,
    private dialog: MatDialog
  ) {
    super(_injector);
  }

  /**
   * OnInit lifecycle method
   */
  ngOnInit(): void {
    this.pageMode = this._activatedRoute.snapshot.data["pageMode"];
  }

  /**
   * Close button on click action
   */
  closeOnClick(): void {
    this._router.goToAdministrationModule();
  }


  openDialogWithoutRef() {
    const dialogRef = this.dialog.open(PaymentMethodsItemComponent, {
      width: '800px',
      data: { pageMode: PageMode.Add, permissions: 'UserRead'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.paymentMethodsList.initTablePaymentsMethods();
    });
  }

  /**
   * Allow destroy all in memory
   *
   * @return
   */
  override ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }
}
