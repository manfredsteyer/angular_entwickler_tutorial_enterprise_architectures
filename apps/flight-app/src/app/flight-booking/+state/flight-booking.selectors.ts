import { FlightBookingState } from './flight-booking.interfaces';

export const selectFlights = 
    (s: FlightBookingState) => s.flightBooking.flights