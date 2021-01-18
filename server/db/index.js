var { Sequelize, model, datatypes } = require('sequelize');

var db = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// we define the models we need using js--we don't need a schema file!
var User = db.define('User', {
  userName: Sequelize.STRING,
});

var Rooms = db.define('Rooms', {
  roomName: Sequelize.STRING,
});

var Message = db.define('Message', {
  userMessage: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  roomId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});


// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
// enables bi-directional associations between Users and Messages
Message.belongsTo(User);
User.hasMany(Message);

// puts a roomId column on each Message instance
Message.belongsTo(Rooms);
Rooms.hasMany(Message);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;
exports.Rooms = Rooms;


// var mysql = require('mysql');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".

// var dbConnection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

// module.exports = dbConnection;
