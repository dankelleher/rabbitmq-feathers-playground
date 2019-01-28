const { MongoClient } = require('mongodb');

module.exports = function(app) {
  const connectionString = 'mongodb://localhost:27017';
  const promise = MongoClient.connect(connectionString).then(client => {
    app.set('mongoClient', client);

    return client.db('dummy-receiver');
  });

  app.set('dbPromise', promise);
};
