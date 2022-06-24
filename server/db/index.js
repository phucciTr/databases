var { Sequelize, model, datatypes } = require('sequelize');
var mysql = require('mysql2/promise');

const initDataBase = async (databaseName) => {
  var Users, Rooms, Messages;

  const connection = await mysql.createConnection({
    user: 'root',
    password: '',
    database: 'mysql'
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
  connection.end();

  var db = new Sequelize(`${databaseName}`, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

  // we define the models we need using js--we don't need a schema file!
  Users = db.define('Users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  Rooms = db.define('Rooms', {
    roomname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  Messages = db.define('Messages', {
    text: Sequelize.STRING,
    user: { type: Sequelize.INTEGER, allowNull: false },
    room: { type: Sequelize.INTEGER, allowNull: false }
  });


  // puts a UserId column on each Message instance
  // also gives us the `.setUser` method available
  // after creating a new instance of Message
  // enables bi-directional associations between Users and Messages
  Messages.belongsTo(Users, { foreignKey: 'user' });
  Users.hasMany(Messages, { foreignKey: 'user' });

  // puts a roomId column on each Message instance
  Messages.belongsTo(Rooms, { foreignKey: 'room' });
  Rooms.hasMany(Messages, { foreignKey: 'room' });

  await Rooms.sync();
  await Users.sync();
  await Messages.sync();

  return { Rooms, Messages, Users }
};

module.exports = initDataBase;
