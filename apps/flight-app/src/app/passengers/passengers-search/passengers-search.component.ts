import { Component, OnInit } from '@angular/core';
import { PassengerState, selectAllPassengers } from '../+state/passenger.selectors';
import { Store } from '@ngrx/store';
import { LoadPassengers } from '../+state/passenger.actions';
import { Observable } from 'rxjs/Observable';
import { Passenger } from '../+state/passenger.model';

@Component({
  selector: 'passengers-search',
  templateUrl: './passengers-search.component.html',
  styleUrls: ['./passengers-search.component.css']
})
export class PassengersSearchComponent implements OnInit {

  constructor(private store: Store<PassengerState>) { }

  passengers$: Observable<Passenger[]>;

  ngOnInit() {
    this.store.dispatch(new LoadPassengers({passengers: [
      {id: 1, name: 'Max Muster'}
    ]}));

    this.passengers$ = this.store.select(selectAllPassengers);
  }

}
