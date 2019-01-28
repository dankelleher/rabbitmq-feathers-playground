const assert = require('assert');
const app = require('../../src/app');

describe('\'dummy\' service', () => {
  it('registered the service', () => {
    const service = app.service('dummy');

    assert.ok(service, 'Registered the service');
  });
});
