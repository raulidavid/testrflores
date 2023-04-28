import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@madsis/internal/core/components/app-component-base';
import { BreadcrumbItem } from '@madsis/internal/core/components/sub-header/sub-header.component';
import { RouterNavigatorService } from '@madsis/internal/core/services/router-navigator.service';
import { AdministrationRoutesEnum } from '@madsis/shared/enums/administration.routes.enum';
import { PageMode } from '@madsis/shared/enums/generic.enum';
import { ModulesRoutesEnum } from '@madsis/shared/enums/modules-routes.enum';
import { Environment, InviteUserSetup, SweetAlertService, TenantAdminServiceProxy, appModuleAnimation } from 'common';
import { Subscription, catchError, map, of } from "rxjs";
import { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: 'inviteusers-item',
  templateUrl: './inviteusers-item.component.html',
  styleUrls: ['./inviteusers-item.component.scss'],
  animations: [appModuleAnimation()],
})
export class InviteUsersItemComponent extends AppComponentBase implements OnInit
{
    subscriptions: Subscription[] = [];
    @ViewChild("listSelectionList") listSelectionList = {} as MatSelectionList;
    InviteFormGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email], []],
      roleNames: [null, [], []],
      expirationTime: [null, [Validators.required], []],
    });
    breadcrumbs: BreadcrumbItem[] = [
        new BreadcrumbItem("Administration", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}`),
        new BreadcrumbItem("Invite Users", `${ModulesRoutesEnum.dashboard}/${ModulesRoutesEnum.administration}/${AdministrationRoutesEnum.inviteusers}`),
    ];
    isLoading: boolean = false;
    pageMode!: PageMode;
    _inviteUserSetup: InviteUserSetup = new InviteUserSetup();
    _sweetOptions = {} as SweetAlertOptions;
    /**
     * Base constructor
     */
    constructor(
      private _activatedRoute: ActivatedRoute,
      _injector: Injector,
      private _router: RouterNavigatorService,
      private _formBuilder: UntypedFormBuilder,
      private _sweetAlertService: SweetAlertService,
      private _tenantAdminService: TenantAdminServiceProxy,
      private environment: Environment
    ) {
      super(_injector);
    }

    /**
     * OnInit lifecycle method
     */
    ngOnInit(): void {
      this.pageMode = this._activatedRoute.snapshot.data["pageMode"];
      const sub1$ = this._tenantAdminService.inviteUserGet().subscribe((res) => {
        this._inviteUserSetup = res;
      });

      const sub2$ = this.emailControl.valueChanges.subscribe((res) => {
        this._inviteUserSetup.email = res;
      });

      const sub3$ = this.expirationTimeControl.valueChanges.subscribe((res) => {
        this._inviteUserSetup.inviteExpiration = res;
      });
      this.subscriptions = [...this.subscriptions, sub1$, sub2$, sub3$];
    }

    /**
     * Close button on click action
     */
    closeOnClick(): void {
      this._router.goToAdministrationModule();
    }

    onSelectionChange(){
      this._inviteUserSetup.roleNames = this.listSelectionList.selectedOptions.selected.map((item) => item.value);
    }

    /**
     * Save button on click action
     */
    sendInvitationOnClick(): void {
      this.InviteFormGroup.markAllAsTouched();
      if(this.InviteFormGroup.invalid){
        return;
      }
      this._sweetOptions = {} as SweetAlertOptions;
      const sub5$ = this._tenantAdminService.inviteUserPost(this._inviteUserSetup).pipe(
        map ((res) => {
          if(res.isValid){
            this._sweetOptions.title = "Invitación enviada al correo: <br>" + this._inviteUserSetup.email;
            this._sweetOptions.icon = "success";
            this._sweetOptions.html = res.message + `<br><a href="${this.environment.frontendUrl}/auth/register?verify=${res.result.url}" target="_blank">${this.environment.frontendUrl}/auth/register?verify=${res.result.url}</a>`;
          }else{
            this._sweetOptions.html = res.message;
            this._sweetOptions.title = "Error al enviar la invitación";
            this._sweetOptions.icon = "error";
          }
          return res;
        }),
        catchError((err) => {
          let newError = JSON.parse(err.response);
          this._sweetOptions.title = newError.title;
          this._sweetOptions.text = JSON.stringify(newError.errors);
          this._sweetOptions.icon = "error";
          return of(err);
        })
      ).subscribe((res) => {
        this._sweetAlertService.dispatch(this._sweetOptions).then((result) => {
          this.InviteFormGroup.reset();
          this.listSelectionList.selectedOptions.clear();
          this.ngOnInit();
        });
      });
      this.subscriptions = [...this.subscriptions, sub5$];
    }

    get emailControl(){
      return this.InviteFormGroup.get("email") as UntypedFormControl;
    }

    get roleNamesControl(){
      return this.InviteFormGroup.get("roleNames") as UntypedFormControl;
    }

    get expirationTimeControl(){
      return this.InviteFormGroup.get("expirationTime") as UntypedFormControl;
    }
}
