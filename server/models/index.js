var db = require('../db');

module.exports = {

  messages: {
    get: function (cb) {
      let queryString = 'SELECT * from messages';

      db.query(queryString, (err, result) => {
        console.log('result = ', result);
        cb(null, result);
      });

    }, // a function which produces all the messages

    post: function ({username, message, roomname}, cb) {

      var queryString = `INSERT INTO messages VALUE(0, '${username}', "${message}", '${roomname}')`;

      db.query(queryString, (err, result) => {
        cb(null, result);
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.req.
    get: function () {},

    post: function ({userName}, cb) {

      var queryString = `INSERT INTO users VALUE(0, '${userName}')`;

      db.query(queryString, (err, result) => {
        cb(null, result);
      });
    }
  }
};

