import { Component } from '@angular/core';
import { LoggerService } from '@flight-workspace/logger-lib';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private oauthService: OAuthService,
    private logger: LoggerService) {
      
    logger.debug('Hallo Welt!');
    logger.log('Application started');


    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }
}
