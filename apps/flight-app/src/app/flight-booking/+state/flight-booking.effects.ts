import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FlightService } from '@flight-workspace/flight-api';
import { FLIGHTS_LOAD_ACTION_TYPE, FlightsLoadAction, FlightsLoadedAction } from './flight-booking.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {

    constructor(private flightService: FlightService, private actions$: Actions) {
    }


    @Effect()
        flightLoadEffect = 
            this.actions$
                .ofType(FLIGHTS_LOAD_ACTION_TYPE)
                .pipe(
                    switchMap((a: FlightsLoadAction) => this.flightService.find(a.from, a.to, a.urgent)),
                    map(flights => new FlightsLoadedAction(flights))
                )

}
