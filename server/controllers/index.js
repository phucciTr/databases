var models = require('../models');

module.exports = {

  messages: {

    get: function (req, res) {
      db.Message.findAll({include: [db.User]})
        .then(function(messages) {
          res.json(messages);
        });
    },

    post: function (req, res) {
      let data = req.body;
      // Find the record matching the specified criteria. If no such record exists, create one using the provided initial values. or, if you need to know whether a new record was created.
      console.log('data:', data);
      db.User.findOrCreate({where: {userName: req.body.userName}})

        .spread(function(user, created) {
          db.Message.create({
            userid: user.get('id'),
            userName: req.body.userName,
            userMessage: req.body.userMessage,
            roomName: req.body.roomName
          }).then(function(message) {
            res.sendStatus(201);
          });
        });
    }

    // get: function (req, res) {
    //   // go into database, get (all messages) from the messages table

    //   models.messages.get((err, result) => {
    //     res.status(200).json(result);
    //   });
    // }, // a function which handles a get request for all messages

    // post: function (req, res) {
    //   let data = req.body;

    //   models.messages.post(data, (err, result) => {
    //     if (err) { throw err; }
    //     res.status(201).json(result);
    //   });
    // } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      db.User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {userName: req.body.userName}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  }
  //   // Ditto as above
  //   get: function (req, res) {

  //   },

  //   post: function (req, res) {

  //     let data = req.body;

  //     models.users.post(data, (err, result) => {
  //       if (err) { throw err; }
  //       res.status(201).json(result);
  //     });
  //   }
  // }
};
