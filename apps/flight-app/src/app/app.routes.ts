import { ExtraOptions, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { PreloadAllModules } from '@angular/router';
import { CustomPreloadingStrategy } from './shared/preloading/custom-preloading-strategy';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: './flight-booking/flight-booking.module#FlightBookingModule',
    data: {
      preload: false
    }
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategy
};
