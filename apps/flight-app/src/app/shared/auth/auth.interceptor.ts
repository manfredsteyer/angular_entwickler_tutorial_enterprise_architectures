import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { Router } from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private oauthStorage: OAuthStorage,
    private router: Router) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Vital
    if (req.url.startsWith('http://www.angular.at')) {
      
      let headers = req.headers.set('Authorization', 'Bearer ' + this.oauthStorage.getItem('access_token'));

      req = req.clone({ headers });
    }

    return next.handle(req).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(event: HttpErrorResponse) {
    if (event.status == 401 || event.status == 403) {
      this.router.navigate(['/home', { needLogin: true }]);
    }
    return _throw(event);
  }
}
