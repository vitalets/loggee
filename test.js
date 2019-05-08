
const sinon = require('sinon');
const assert = require('assert');
const Loggee = require('./index');

const logger = Loggee.create('prefix');

afterEach(() => {
  Loggee.mute(false);
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
  sinon.assert.calledWith(stub, '[prefix]', error);
});

describe('setOnErrorHandler', () => {
  afterEach(() => {
    Loggee.setOnErrorHandler(null);
  });

  it('call handler', () => {
    const stub = sinon.stub(console, 'error');
    const handler = sinon.spy();
    Loggee.setOnErrorHandler(handler);
    const error = new Error('foo');
    logger.error(error);
    stub.restore();
    sinon.assert.calledWith(handler, error);
  });

  it('if handler throws - do nothing', () => {
    const stub = sinon.stub(console, 'error');
    const handler = () => {
      throw new Error('bar');
    };
    Loggee.setOnErrorHandler(handler);
    assert.doesNotThrow(() => logger.error('foo'));
    stub.restore();
  });
});

describe('mute', () => {
  afterEach(() => {
    Loggee.mute(false);
  });

  it('muted', () => {
    const stub = sinon.stub(console, 'log');
    Loggee.mute();
    logger.log('foo');
    stub.restore();
    sinon.assert.notCalled(stub);
  });

  it('unmuted', () => {
    const stub = sinon.stub(console, 'log');
    Loggee.mute();
    Loggee.mute(false);
    logger.log('foo');
    stub.restore();
    sinon.assert.calledWith(stub, '[prefix]', 'foo');
  });
});

