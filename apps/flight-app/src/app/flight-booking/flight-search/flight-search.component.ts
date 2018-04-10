import { Component, OnInit } from '@angular/core';
import { FlightService, Flight } from '@flight-workspace/flight-api';
import { FlightBookingState } from '../+state/flight-booking.interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FlightsLoadedAction, FlightUpdatedAction, FlightsLoadAction } from '../+state/flight-booking.actions';
import { first } from 'rxjs/operators';
import { selectFlights } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    '3': true,
    '5': true
  };

  flights$: Observable<Flight[]>;

  constructor(
    private store: Store<FlightBookingState>,
    private flightService: FlightService) {}

  ngOnInit() {

    this.flights$ = this.store.select(selectFlights);
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(new FlightsLoadAction(this.from, this.to, this.urgent));
  }

  delay(): void {

    this.flights$.pipe(first()).subscribe(flights => {
      let oldFlight = flights[0];
      let oldDate = new Date(oldFlight.date);

      let newDate = new Date(oldDate.getTime() + 1000 * 60 * 15);
      let newFlight: Flight = {
        ...oldFlight,
        date: newDate.toISOString()
      };

      this.store.dispatch(new FlightUpdatedAction(newFlight));

    });

    // this.flightService.delay();
  
  }
}
