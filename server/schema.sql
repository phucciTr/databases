CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT PRIMARY KEY AUTO_INCREMENT,
  text VARCHAR(50),
  username VARCHAR(50),
  roomname VARCHAR(50),
  userId INT,
  roomId INT,
  createdAt DATETIME,
  updatedAt DATETIME
);
/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50),
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roomname VARCHAR(30),
  createdAt DATETIME,
  updatedAt DATETIME
);

-- CREATE TABLE ids (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   id_messages INT,
--   id_user INT,
--   id_room INT,
--   FOREIGN KEY (id_messages) REFERENCES messages(id),
--   FOREIGN KEY (id_user) REFERENCES users(id),
--   FOREIGN KEY (id_room) REFERENCES rooms(id)
-- );
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

