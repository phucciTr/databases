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

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {

      let results = data.results;
      console.log('results = ', results);

      RoomsView.appendRooms(results);
      RoomsView.renderSelectedRoom();

      let firstRoom = Object.keys(Rooms.addedRooms)[0];
      RoomsView.renderRoom(firstRoom);

      callback();
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