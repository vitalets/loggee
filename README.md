# Loggee

Zero-dependency console logger with prefixed output and log-level muting.

## Installation
```bash
npm install loggee --save
```

## Usage
#### Prefixed output
```js
const logger = require('loggee').create('My module');
 
logger.log('Hello world!'); // => [My module] Hello World!
```

#### Different methods
```js
logger.debug(...);
logger.log(...);
logger.info(...);
logger.warn(...);
logger.error(...);
```

#### Log level muting
```js
const loggee = require('loggee');

loggee.setLogLevel('error'); // show only errors
loggee.setLogLevel('none');  // mute
```

## API

#### create([prefix])
  * `prefix {String}` prefix to be prepended to all messages of that logger.
  * returns: `{Logger}`
  
Creates logger with specified prefix. 

#### setLogLevel(level)
  * `level {String}` log level for all loggers. Possible values are: `debug|log|warn|error|none`. 

Sets new log level for all loggers.

#### logger.debug(...)
Outputs debug message.

#### logger.log(...)
Outputs log message.

#### logger.info(...)
Outputs info message.

#### logger.warn(...)
Outputs warning.

#### logger.error(...)
Outputs error.


## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
