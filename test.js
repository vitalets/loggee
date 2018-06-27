
const sinon = require('sinon');
const loggee = require('./index');

const logger = loggee.create('prefix');

afterEach(() => {
  sinon.reset();
});

it('debug', () => {
  loggee.setLogLevel('debug');
  const stub = sinon.stub(console, 'debug');
  logger.debug('foo');
  stub.restore();
  sinon.assert.calledWith(stub, '[prefix]', 'foo');
});

it('log', () => {
  const stub = sinon.stub(console, 'log');
  logger.log('foo');
  stub.restore();
  sinon.assert.calledWith(stub, '[prefix]', 'foo');
});

it('info', () => {
  const stub = sinon.stub(console, 'info');
  logger.info('foo');
  stub.restore();
  sinon.assert.calledWith(stub, '[prefix]', 'foo');
});

it('warn', () => {
  const stub = sinon.stub(console, 'warn');
  logger.warn('foo');
  stub.restore();
  sinon.assert.calledWith(stub, '[prefix]', 'foo');
});

it('error', () => {
  const stub = sinon.stub(console, 'error');
  logger.error('foo');
  stub.restore();
  sinon.assert.calledWith(stub, '[prefix]', 'foo');
});
