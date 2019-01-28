// Initializes the `dummy` service on path `/dummy`
const createService = require('feathers-memory');
const hooks = require('./dummy.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dummy', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('dummy');

  service.hooks(hooks);
};
