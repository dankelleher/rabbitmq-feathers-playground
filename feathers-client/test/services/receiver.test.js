const assert = require('assert');
const app = require('../../src/app');

describe('\'receiver\' service', () => {
  it('registered the service', () => {
    const service = app.service('receiver');

    assert.ok(service, 'Registered the service');
  });
});
