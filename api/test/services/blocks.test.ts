import assert from 'assert';
import app from '../../src/app';

describe('\'blocks\' service', () => {
  it('registered the service', () => {
    const service = app.service('blocks');

    assert.ok(service, 'Registered the service');
  });
});
