import { Injectable } from '@angular/core';
import { LoggerConfig } from './logger-config';
import { LogFormatterService } from './log-formatter.service';

@Injectable()
export class LoggerService {
  constructor(private config: LoggerConfig) {}

  debug(message: string): void {
    if (!this.config.enableDebug) return;
    console.debug(message);
  }

  log(message: string): void {
    console.log(message);
  }
}
