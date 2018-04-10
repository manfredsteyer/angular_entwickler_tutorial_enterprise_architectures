import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { FlightEditComponent } from '../../flight-booking/flight-edit/flight-edit.component';
import { Observable } from 'rxjs/Observable';

export interface CanExit {
  canExit(): Observable<boolean>;
}

@Injectable()
export class ExitGuard implements CanDeactivate<CanExit> {
  canDeactivate(
    component: CanExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> {
    return component.canExit();
  }
}
