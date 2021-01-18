var { Sequelize, model, datatypes } = require('sequelize');

var db = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // define: { timestamps: false }
});

// we define the models we need using js--we don't need a schema file!
var User = db.define('User', {
  userName: Sequelize.STRING,
});

var Message = db.define('Message', {
  userName: Sequelize.STRING,
  userMessage: Sequelize.STRING,
  roomName: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});


// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
Message.belongsTo(User);
// enables bi-directional associations between Users and Messages
User.hasMany(Message);


User.sync();
Message.sync();
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.Message = Message;


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
