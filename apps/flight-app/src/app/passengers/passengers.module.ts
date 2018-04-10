import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPassenger from './+state/passenger.reducer';
import { PassengersSearchComponent } from './passengers-search/passengers-search.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('passenger', fromPassenger.reducer)
  ],
  declarations: [
    PassengersSearchComponent
  ],
  exports: [
    PassengersSearchComponent
  ]
})
export class PassengersModule { }
