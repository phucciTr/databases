var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);
    let regex = /%20/gi;
    App.username = App.username.replace(regex, ' ');

    FormView.initialize();
    RoomsView.initialize();

    App.startSpinner();
    App.fetch(App.stopSpinner);

    MessagesView.initialize();
  },

  writeAllToDB: (upstreamData, callback) => {
    for (let key in upstreamData) {
      let {text, username, roomname} = upstreamData[key];
      Parse.writeToDB({text, username, roomname});
    }
  },

  fetch: function(callback = ()=>{}) {

    Parse.readAll((data) => {

      if (data.results) {
        RoomsView.appendRooms(data.results);
        RoomsView.renderSelectedRoom();
        let firstRoom = Object.keys(Rooms.addedRooms)[0];
        RoomsView.renderRoom(firstRoom);

        App.writeAllToDB(data.results, Parse.readAllFromDB((DBdata) => {
          let results = DBdata;
          RoomsView.appendRooms(results);
        }));

        callback();
      }
    });
  },

  reloadPage: function() {
    RoomsView.$select.html('');
    MessagesView.$chats.html('');
    Rooms.addedRooms = {};

    Parse.readAll((data) => {
      let results = data.results;
      App.startSpinner();
      RoomsView.appendRooms(results);
      RoomsView.renderSelectedRoom();
      RoomsView.reRenderSelectedRoom();
      App.stopSpinner();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};