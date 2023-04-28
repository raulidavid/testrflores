import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@madsis/internal/core/components/app-component-base';
import { BreadcrumbItem } from '@madsis/internal/core/components/sub-header/sub-header.component';
import { RouterNavigatorService } from '@madsis/internal/core/services/router-navigator.service';
import { AdministrationRoutesEnum } from '@madsis/shared/enums/administration.routes.enum';
import { PageMode } from '@madsis/shared/enums/generic.enum';
import { ModulesRoutesEnum } from '@madsis/shared/enums/modules-routes.enum';
import { appModuleAnimation, PermissionInfoWithSelectDto, RoleCreateUpdateDto, AuthpUsersServiceProxy, SetupManualUserChange, SweetAlertService } from 'common';
import { Subscription } from "rxjs";
import { SweetAlertOptions } from "sweetalert2";

/**
 * Main component for the Roles submodule's Add/Edit/View page
 * https://stackblitz.com/edit/virtual-scrolling-selection-list?file=src%2Fapp%2Flist-selection-example.ts,src%2Fapp%2Fmaterial-module.ts
 */
@Component({
  selector: "authusers-item",
  templateUrl: "./authusers-item.component.html",
  styleUrls: ["./authusers-item.component.scss"],
  animations: [appModuleAnimation()],
})
export class AuthUsersItemComponent extends AppComponentBase implements OnInit
{
    subscriptions: Subscription[] = [];
    @ViewChild("allRoleNames") listSelectionList = {} as MatSelectionList;
    userEdit = new SetupManualUserChange();
    RoleFormGroup = this._formBuilder.group({
      email: [null, [Validators.required], []],
      userName: [null, [Validators.required], []],
      roleNames: [null, [], []],
      tenantName: [null, [], []],
      allRoleNames: [null, [], []],
      allTenantNames: [null, [], []],
    });
    breadcrumbs: BreadcrumbItem[] = [
        new BreadcrumbItem("Administration", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}`),
        new BreadcrumbItem("Auth Users", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}/${AdministrationRoutesEnum.authusers}`),
        new BreadcrumbItem("Item", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}/${AdministrationRoutesEnum.authusers}`),
    ];
    userId: string = "";
    isLoading: boolean = false;
    pageMode!: PageMode;

    /**
     * Base constructor
     */
    constructor(
      private _activatedRoute: ActivatedRoute,
      _injector: Injector,
      private _router: RouterNavigatorService,
      private _formBuilder: UntypedFormBuilder,
      private _authpUsersServiceProxy: AuthpUsersServiceProxy,
      private _sweetAlertService: SweetAlertService
    ) {
      super(_injector);
    }

    /**
     * OnInit lifecycle method
     */
    ngOnInit(): void {
      this.pageMode = this._activatedRoute.snapshot.data["pageMode"];
      if (this._activatedRoute.snapshot.params["userId"]) {
        this.userId = this._activatedRoute.snapshot.params["userId"];
        const sub = this._authpUsersServiceProxy.editGet(this.userId).subscribe((res) => {
          this.email.setValue(res.email);
          this.userName.setValue(res.userName);
          this.allTenantNames.setValue(res.tenantName);
          this.roleNames.setValue(res.roleNames);
          this.userEdit = res;
        });
        this.subscriptions = [...this.subscriptions, sub];
      }

      if (this.isViewMode()) {
        this.RoleFormGroup.disable();
      }

      const sub2 = this.email.valueChanges.subscribe((res) => {
        this.userEdit.email = res;
      });
      const sub3 = this.userName.valueChanges.subscribe((res) => {
        this.userEdit.userName = res;
      });
      const sub4 = this.allTenantNames.valueChanges.subscribe((res) => {
        this.userEdit.tenantName = res;
        this.tenantName.setValue(res);
      });

      this.subscriptions = [...this.subscriptions, sub2,sub3,sub4];
    }

    /**
     * Checks if the inputs are in view mode
     */
    isViewMode(): boolean {
      return this.pageMode === PageMode.View;
    }

    /**
     * Checks if the inputs are in edit mode
     */
    isEditMode(): boolean {
      return this.pageMode === PageMode.Edit;
    }

    /**
     * Checks if the inputs are in add mode
     */
    isAddMode(): boolean {
      return this.pageMode === PageMode.Add;
    }

    /**
     * Edit button on click action
     */
    editOnClick(): void {
      /*this._router.goToAccountingSubmoduleEdit(
        AccountingRoutesEnum.apInvoiceEntry,
        this.journalId
      );*/
    }

    /**
     * Close button on click action
     */
    closeOnClick(): void {
      this._router.goToAdministrationSubmodule(
        AdministrationRoutesEnum.authusers
      );
    }

    onSelectionChange(){
      this.userEdit.roleNames = this.listSelectionList.selectedOptions.selected.map((item) => item.value);
    }

    /**
     * Save button on click action
     */
    saveOnClick(): void {
      const sub5 = this._authpUsersServiceProxy.editPost(this.userEdit).subscribe((res) => {
        let sweetOptions = {} as SweetAlertOptions;
        sweetOptions.title = "Error al actualizar el usuario";
        sweetOptions.text = "";
        sweetOptions.icon = "error";
        if (res != null) {
          sweetOptions.title = "";
          sweetOptions.text = res;
          sweetOptions.icon = "success";
        }
        this._sweetAlertService.dispatch(sweetOptions).then((result) => {
          
        });
      });
      this.subscriptions = [...this.subscriptions, sub5];
    }

    get email(){
      return this.RoleFormGroup.get("email") as UntypedFormControl;
    }

    get userName(){
      return this.RoleFormGroup.get("userName") as UntypedFormControl;
    }

    get roleNames(){
      return this.RoleFormGroup.get("roleNames") as UntypedFormControl;
    }

    get tenantName(){
      return this.RoleFormGroup.get("tenantName") as UntypedFormControl;
    }

    get allTenantNames(){
      return this.RoleFormGroup.get("allTenantNames") as UntypedFormControl;
    }

    get allRoleNames(){
      return this.RoleFormGroup.get("allRoleNames") as UntypedFormControl;
    }
}
