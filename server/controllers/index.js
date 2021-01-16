var models = require('../models');

module.exports = {

  messages: {
    get: function (req, res) {
      // go into database, get (all messages) from the messages table

      models.messages.get((err, result) => {
        // if (err) { throw err; }
        console.log('result = ', result);
        res.status(200).json(result);
      });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      let data = req.body;

      models.messages.post(data, (err, result) => {
        if (err) { throw err; }
        res.status(201).json(result);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },

    post: function (req, res) {

      let data = req.body;

      models.users.post(data, (err, result) => {
        if (err) { throw err; }
        res.status(201).json(result);
      });


    }
  }
};
