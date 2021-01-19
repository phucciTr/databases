
var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,
  database: 'http://127.0.0.1:3000/classes/messages',

  create: function(message, successCB, errorCB = null) {

    $.ajax({
      url: this.database,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent to local DB by ', message.username);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });

    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent to HR server by ', message.username);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });

  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });

    $.ajax({
      url: this.database,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }
};