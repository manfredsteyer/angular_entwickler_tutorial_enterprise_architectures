import { Flight } from "@flight-workspace/flight-api";

export const FLIGHTS_LOADED_ACTION_TYPE = '[FlightBooking] FLIGHTS_LOADED_ACTION';
export const FLIGHTS_LOAD_ACTION_TYPE = '[FlightBooking] FLIGHTS_LOAD_ACTION';
export const FLIGHT_UPDATED_ACTION_TYPE = '[FlightBooking] FLIGHT_UPDATED_ACTION_TYPE';

export class FlightsLoadedAction {
  readonly type = FLIGHTS_LOADED_ACTION_TYPE;
  constructor(readonly flights: Flight[]) {

  }
}

export class FlightUpdatedAction {
  readonly type = FLIGHT_UPDATED_ACTION_TYPE;
  constructor(readonly flight: Flight) {
  }
}

export class FlightsLoadAction {
  readonly type = FLIGHTS_LOAD_ACTION_TYPE;
  constructor(readonly from: string, readonly to: string, readonly urgent: boolean) {
  }
}

export type FlightBookingAction = FlightsLoadedAction | FlightUpdatedAction;
