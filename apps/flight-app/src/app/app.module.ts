import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FlightApiModule } from '@flight-workspace/flight-api';

import { AppComponent } from './app.component';
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes';
import { BasketComponent } from './basket/basket.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoggerModule } from '@flight-workspace/logger-lib';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { PassengersModule } from './passengers/passengers.module';
import { OAuthModule } from 'angular-oauth2-oidc';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';



import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeDeAt from '@angular/common/locales/de-AT';
import localeEs from '@angular/common/locales/es';
 
registerLocaleData(localeDe);     // de-DE
registerLocaleData(localeDeAt);   // de-AT
registerLocaleData(localeEs);     // es-ES


export function createLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createLoader,
          deps: [HttpClient]
      }
  }),

    OAuthModule.forRoot(),
    // FlightBookingModule, // Würde Lazy-Loading verhindern!!
    PassengersModule,
    FlightApiModule.forRoot(),
    LoggerModule.forRoot({ enableDebug: true }),
    SharedModule.forRoot(),
    RouterModule.forRoot(
      [...APP_ROUTES],
      { ...APP_EXTRA_OPTIONS }),
    StoreModule.forRoot(
        { app: appReducer },
        {
          initialState: { app: appInitialState },
          metaReducers: !environment.production ? [storeFreeze] : []
        }
      ),
      EffectsModule.forRoot([AppEffects]),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      //StoreRouterConnectingModule
    
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent,
  ],
  providers: [
    AppEffects,
    {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
