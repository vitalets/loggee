export = Loggee;

declare class Loggee {
    static create(prefix?: string): Loggee;
    static setLogLevel(level: Loggee.Level): void;
    constructor(prefix?: string);
    debug(...args: any[]): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

declare namespace Loggee {
    export const enum Level {
      debug = 'debug',
      log = 'log',
      info = 'info',
      warn = 'warn',
      error = 'error',
      none = 'none',
    }
}
