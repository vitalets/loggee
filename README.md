# Loggee

Tiny JavaScript logger with namespaces. Work in both Node.js and browser.

## Installation
```bash
npm install loggee --save
```

## Usage
Require and set namespace in one line:
```js
const logger = require('loggee').create('My module');
 
logger.log('Hello world!'); // => [My module] Hello World!
logger.info('Hello world!'); // => [My module] Hello World!
logger.warn('Hello world!'); // => [My module] Hello World!
logger.error('Hello world!'); // => [My module] Hello World!
logger.debug('Hello world!'); // => [My module] Hello World!
```

#### Mute
You can mute logger globally:
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

#### setOnErrorHandler(handler)
  * `handler {Function}`

Sets handler to be called on every error.

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
