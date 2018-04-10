import { Flight } from "@flight-workspace/flight-api";


export interface FlightBooking {
  
  flights: Flight[];

}

// Aus technischen Gründen
export interface FlightBookingState {
  readonly flightBooking: FlightBooking;
}
