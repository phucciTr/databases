var db = require('../db');

module.exports = {
    // need to the roomName & users.name to get & post message

  // server: ,

  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (user, room) {
      // app.post('/endpoint.js', (req, res) => {

      //   .send({user, room, message});
      //   /*server
      //     if the user isn't on the users table
      //       insert user to table
      //     otherwise if the room isn't on the rooms table
      //       insert the room name to the table
      //     otherwise
      //       get the user id and room id
      //       insert the message to messages
      //       send a success response
      //   */
      // });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data) {
      // write data to database
      // console.log('data = ', data);
    }
  }
};

