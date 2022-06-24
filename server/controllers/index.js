let db;
const Op = require('Sequelize').Op;
const connection = require('../db')('chatterbox')
  .then((dbConnection) => db = dbConnection);


module.exports = {

  messages: {
    get: function (req, res) {
      db.Messages.findAll({include: [db.Users, db.Rooms]})
        .then((messages) => {
          res.status(200).json(messages);
        })
        .catch((err) => {
          console.log('ERROR GETTING MESSAGES = ', err);
        })
    },

    post: async (req, res) => {
      let {username, text, roomname} = req.body;

      try {
        let room = await db.Rooms.findOrCreate({ where: { roomname: roomname } });
        let user = await db.Users.findOrCreate({ where: { username: username } });
        let userId = user[0].dataValues.id;
        let roomId = room[0].dataValues.id;

        let successMsg = await db.Messages.create({
          text: text,
          user: userId,
          room: roomId
        });

        res.status(201).json(successMsg);
      }
      catch(e) { console.log('ERROR POSTING MESSAGE = ', e); }
    },

    batchPost: async (req, res) => {
      let messages = req.body, successMsg;

      for (let {username, text, roomname} of messages) {
        try {
          let room = await db.Rooms.findOrCreate({ where: { roomname: roomname } });
          let user = await db.Users.findOrCreate({ where: { username: username } });
          let userId = user[0].dataValues.id;
          let roomId = room[0].dataValues.id;

          let successMsg = await db.Messages.findOrCreate({
            where: {
              [Op.and]: [
                { text: text },
                { user: userId },
                { room: roomId }
              ]
            },
            defaults: {
              text: text,
              user: userId,
              room: roomId
            }
          });

        }
        catch(e) { console.log('ERROR BATCH POSTING = ', e); }
      }
      res.status(201).json(successMsg);
    }

  },

  users: {
    get: function (req, res) {
      db.Users.findAll()
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          if (err) { console.log('err = ', err); }
        });
    },
    post: function (req, res) {

      db.Users.findOrCreate({where: {username: req.body.username}})
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          if (err) { console.log('err = ', err); }
        });
    }
  }
};
