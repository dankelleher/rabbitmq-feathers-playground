const receiver = require('./receiver/receiver.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(receiver);
};
