var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);
    let regex = /%20/gi;
    App.username = App.username.replace(regex, ' ');


    App.startSpinner();
    App.fetch(App.stopSpinner);

    FormView.initialize();
    RoomsView.initialize();

    App.startSpinner();
    App.fetch(App.stopSpinner);

    MessagesView.initialize();
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAllUpStream((data) => {
      if (data.results) {
        RoomsView.appendUpstreamRooms(data.results);
        RoomsView.renderSelectedRoom();
        let firstRoom = Object.keys(Rooms.addedRooms)[0];
        RoomsView.renderRoom(firstRoom);
        callback();

        Parse.writeAllToDB(data.results, (success) => {
          App.reloadPage();
        });
      }
    });
  },

  reloadPage: function() {
    RoomsView.$select.html('');
    MessagesView.$chats.html('');
    Rooms.addedRooms = {};

    Parse.readAllFromDB((data) => {
      App.startSpinner();
      RoomsView.appendRooms(data);
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