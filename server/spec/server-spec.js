/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // POST new users into db
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // POST new message from new user into db
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {

          // Should have one result:
          expect(results.length).to.equal(1);
          let userText = results[0].userMessage;

          // TODO: If you don't have a column named text, change this test.
          expect(userText).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // POST new message from new user into db
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Valjean',
        text: 'In mercy\'s name, three days is all I need.',
        roomname: 'Hello'
      }
    }, () => {
      var queryString = 'SELECT userName FROM messages';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { throw err; }

        // Now query the Node chat server and see if it returns
        // the message we just inserted:

        request.get('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
          var messageLog = JSON.parse(body);
          console.log('messageLog = ', messageLog);
          expect(messageLog[0].userMessage).to.equal('In mercy\'s name, three days is all I need.');
          expect(messageLog[0].roomName).to.equal('Hello');
          done();
        });
      });
    });

  });


  it('Should get only the user name from the DB', function(done) {
    // POST new messages from new users into db
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Phucci',
        text: 'This is Phucci',
        roomname: 'Zoom'
      }
    }, () => {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Michael',
          text: 'This is Michael',
          roomname: 'Zoom'
        }
      });

      // Retrieve username from db
      var queryString = 'SELECT userName FROM messages';

      dbConnection.query(queryString, (err, results) => {
        let name = results[0].userName;
        expect(name).to.equal('Phucci');
        done();
      });
    });
  });

  it('Should all users from the "lobby" room in the DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Phucci',
        text: 'This is Phucci',
        roomname: 'lobby'
      }
    }, () => {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Michael',
          text: 'This is Michael',
          roomname: 'main'
        }
      });

      // Retrieve username from db
      var queryString = 'SELECT userName FROM messages WHERE roomName = "lobby"';

      dbConnection.query(queryString, (err, results) => {
        let name = results[0].userName;
        expect(name).to.equal('Phucci');
        done();
      });
    });

  });

});