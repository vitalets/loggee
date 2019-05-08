/**
 * Loggee
 */

const LOG_LEVELS = ['debug', 'log', 'info', 'warn', 'error', 'none'];
const DEFAULT_LOG_LEVEL = 'log';

let currentLogLevelPos = LOG_LEVELS.indexOf(DEFAULT_LOG_LEVEL);
let onErrorHandler;
let muted = false;

module.exports = class Loggee {
  static create(prefix) {
    return new Loggee(prefix);
  }

  static setLogLevel(level) {
    const newPos = LOG_LEVELS.indexOf(level);
    if (newPos === -1) {
      throw new Error(`Incorrect log level: ${level}. Possible levels are: ${LOG_LEVELS.join(', ')}`);
    } else {
      currentLogLevelPos = newPos;
    }
  }

  static mute(value = true) {
    muted = value;
  }

  static setOnErrorHandler(handler) {
    onErrorHandler = handler;
  }

  static _callOnErrorHandler(args) {
    if (onErrorHandler) {
      try {
        onErrorHandler(...args);
      } catch (e) {
        // better to nothing here to avoid infinite loop as logger.error() usually handles uncaught exceptions
      }
    }
  }

  constructor(prefix) {
    this.prefix = prefix ? [`[${prefix}]`] : [];
  }

  debug(...args) {
    this._output('debug', args);
  }

  log(...args) {
    this._output('log', args);
  }

  info(...args) {
    this._output('info', args);
  }

  warn(...args) {
    this._output('warn', args);
  }

  error(...args) {
    this._output('error', args);
    Loggee._callOnErrorHandler(args);
  }

  _output(level, args) {
    if (!muted && passLevel(level)) {
      args = [...this.prefix, ...args];
      console[level](...args);  // eslint-disable-line no-console
    }
  }
};

function passLevel(level) {
  const messageLogLevelPos = LOG_LEVELS.indexOf(level);
  return messageLogLevelPos >= currentLogLevelPos;
}
