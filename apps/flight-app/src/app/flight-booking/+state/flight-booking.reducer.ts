import { FlightBooking } from './flight-booking.interfaces';
import { FlightBookingAction, FLIGHTS_LOADED_ACTION_TYPE, FLIGHT_UPDATED_ACTION_TYPE } from './flight-booking.actions';

export function flightBookingReducer(
  state: FlightBooking,
  action: FlightBookingAction
): FlightBooking {
  switch (action.type) {
    case FLIGHTS_LOADED_ACTION_TYPE: {
      
      return { ...state, flights: action.flights }

    }
    case FLIGHT_UPDATED_ACTION_TYPE: {

      let idx = state.flights.findIndex(f => f.id == action.flight.id);

      let newFlights = [
        ...state.flights.slice(0, idx),
        action.flight,
        ...state.flights.slice(idx+1),
      ];


      return { ...state, flights: newFlights };
    }
    default: {
      return state;
    }
  }
}
