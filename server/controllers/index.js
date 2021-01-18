var models = require('../models');
var db = require('../db');


module.exports = {

  messages: {

    get: function (req, res) {
      db.Message.findAll({include: [db.User]})
        .then((messages) => {
          res.status(200).json(messages);
        });
    },

    post: function (req, res) {
      let {username, text, roomname} = req.body;

      // Find the record matching the specified criteria. If no such record exists, create one using the provided initial values. or, if you need to know whether a new record was created.
      db.User.findOrCreate({where: {userName: username}})
        .then((user) => {
          return user[0].dataValues.id;
        })
        .then((userId) => {

          db.Rooms.findOrCreate({where: {roomName: roomname}})
            .then((room) => {
              let roomId = room[0].dataValues.id;
              return [userId, roomId];
            })
            .then(([userId, roomId]) => {
              let data = {userMessage: text, userId: userId, roomId: roomId};

              db.Message.create(data)
                .then((message) => {
                  res.status(201).json(message);
                });
            });
        })
        .catch((err) => {
          if (err) { console.log('err = ', err); }
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
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          if (err) { console.log('err = ', err); }
        });
    },
    post: function (req, res) {

      db.User.findOrCreate({where: {userName: req.body.username}})
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          if (err) { console.log('err = ', err); }
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
