import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@facsis/internal/core/app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';
import { AppComponent } from '@facsis/internal/core/components/app.component';
import { Environment, SharedModule } from 'common';
import { TokenService } from 'common';
import { TokeninterceptorService } from 'common';
import { ApplayoutComponent } from '@facsis/internal/layouts/applayout/applayout.component';
import { HeaderComponent } from '@facsis/internal/layouts/applayout/header/header.component';
import { MenuComponent } from '@facsis/internal/layouts/applayout/menu/menu.component';
import { FooterComponent } from '@facsis/internal/layouts/applayout/footer/footer.component';
import { ExternalModule } from '@facsis/external/external.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@facsis/environments/environment.dev';

@NgModule({
  declarations: [
    AppComponent,
    ApplayoutComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(environment),
    ExternalModule,
  ],
  providers: [
    { provide: Environment, useValue: environment },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }