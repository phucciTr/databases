var models = require('../models');

module.exports = {

  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},

    post: function (req, res) {
      // console.log('req = ', req);
      // console.log('models = ', models);
      // models.users.post(req.data)
    }
  }
};

console.log('models = ', models);