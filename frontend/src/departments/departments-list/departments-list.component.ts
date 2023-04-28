import { Component, Injector, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponentBase } from "@madsis/internal/core/components/app-component-base";
import { BreadcrumbItem } from "@madsis/internal/core/components/sub-header/sub-header.component";
import { RouterNavigatorService } from "@madsis/internal/core/services/router-navigator.service";
import { AdministrationRoutesEnum } from "@madsis/shared/enums/administration.routes.enum";
import { ModulesRoutesEnum } from "@madsis/shared/enums/modules-routes.enum";
import { SalesRoutesEnum } from "@madsis/shared/enums/sales-main.routes.enum";
import { AuthpUsersServiceProxy, AuthUserDisplay, SweetAlertService } from "common";
import { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: 'authusers-list',
  templateUrl: './authusers-list.component.html',
})
export class AuthUsersListComponent extends AppComponentBase implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [
    new BreadcrumbItem(
      'Administración',
      `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}`
    ),
    new BreadcrumbItem(
      'Auth Users',
      `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}/${AdministrationRoutesEnum.authusers}`
    ),
  ];
  _sweetAlertOptions = {} as SweetAlertOptions;
  dataSource: MatTableDataSource<AuthUserDisplay> = new MatTableDataSource();
  isRateLimitReached = false;
  isLoading = false;

  displayedColumns: string[] = [
    'action',
    'userName',
    'email',
    'userId',
    'hasTenant',
    'tenantName',
    'displayedColumns',
  ];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: RouterNavigatorService,
    private _injector: Injector,
    private _authpUsersServiceProxy: AuthpUsersServiceProxy,
    private _sweetAlertService: SweetAlertService
  ) {
    super(_injector);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._authpUsersServiceProxy.authusers().subscribe((res) => {
      this.dataSource.data = res;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {}

  /***
   * View button on click action
   * @param userId
   */
  viewOnClick(userId: string): void {
    this._router.goToAdministrationSubmoduleView(
      AdministrationRoutesEnum.authusers,
      userId
    );
  }

  /***
   * Edit button on click action
   * @param userId
   */
  editOnClick(userId: string): void {
    this._router.goToAdministrationSubmoduleEdit(
      AdministrationRoutesEnum.authusers,
      userId
    );
  }

  /***
   * Close button on click action
   * @param userId
   */
  closeOnClick(): void {
    this._router.goToAdministrationModule();
  }

  /***
   * Delete button on click action
   * @param element
   */
  deleteOnClick(element: AuthUserDisplay): void {
    this._sweetAlertOptions.title = 'Deseas eliminar a ' + element.email + ' ?';
    this._sweetAlertOptions.text = 'Esta acción no se podra revertir!';
    this._sweetAlertOptions.icon = 'warning';
    this._sweetAlertOptions.showCancelButton = true;
    this._sweetAlertOptions.confirmButtonColor = '#d33';
    this._sweetAlertOptions.confirmButtonText = 'Si, eliminar ahora!';
    this._sweetAlertService.dispatch(this._sweetAlertOptions).then((result) => {
      this.spinnerLibrary.start();
      if (result.isConfirmed) {
        this._authpUsersServiceProxy.delete(element.userId).subscribe((res) => {
          this.ngOnInit();
          this.spinnerLibrary.stop();
        });
      }
    });
  }
}