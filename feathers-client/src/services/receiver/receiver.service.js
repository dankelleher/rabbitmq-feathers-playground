// Initializes the `receiver` service on path `/receiver`
const createService = require('feathers-mongodb');
const hooks = require('./receiver.hooks');

module.exports = async function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/receiver', createService(options));

  const db = await app.get('dbPromise');

  // Get our initialized service so that we can register hooks
  const service = app.service('receiver');

  service.Model = db.collection('receiver');

  service.hooks(hooks);
};
