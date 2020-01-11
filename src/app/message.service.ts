import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MessageService {

  messages: string[] = [];


  add(level: Level, message: string) {
    switch (level) {
      case Level.DEBUG:
        this.messages.push('DEBUG: ' + message);
        break;
      case Level.INFO:
        this.messages.push('INFO: ' + message);
        break;
      case Level.WARN:
        this.messages.push('WARN: ' + message);
        break;
      case Level.ERROR:
        this.messages.push('ERROR: ' + message);
        break;
      case Level.FATAL:
        this.messages.push('FATAL: ' + message);
        break;
      default:
        this.messages.push('LOG: ' + message);
        break;
    }
  }

  debug(message: string) {
    this.add(Level.DEBUG, message);
  }

  info(message: string) {
    this.add(Level.INFO, message);
  }

  warn(message: string) {
    this.add(Level.WARN, message);
  }

  error(message: string) {
    this.add(Level.ERROR, message);
  }

  fatal(message: string) {
    this.add(Level.FATAL, message);
  }

  clear() {
    this.messages = [];
  }
} // export class MessageService

export enum Level {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
} // export enum Level
