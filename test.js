
const sinon = require('sinon');
const assert = require('assert');
const Loggee = require('./index');

const logger = Loggee.create('prefix');

afterEach(() => {
  sinon.restore();
});

it('debug', () => {
  Loggee.setLogLevel('debug');
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
  const error = new Error('foo');
  logger.error(error);
  stub.restore();
  sinon.assert.calledOnce(stub);
  sinon.assert.calledWith(stub, '[prefix]', error);
});

it('error: call onErrorHandler', () => {
  const stub = sinon.stub(console, 'error');
  const handler = sinon.spy();
  Loggee.setOnErrorHandler(handler);
  const error = new Error('foo');
  logger.error(error);
  stub.restore();
  sinon.assert.calledWith(handler, error);
});

it('error: if onErrorHandler throws - do nothing', () => {
  const stub = sinon.stub(console, 'error');
  const handler = () => { throw new Error('bar'); };
  Loggee.setOnErrorHandler(handler);
  assert.doesNotThrow(() => logger.error('foo'));
  stub.restore();
});
