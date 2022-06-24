var RoomsView = {

  $roomButton: $('#roomButton'),
  $select: $('#rooms select'),
  $refresh: $('#refreshButton'),

  initialize: function() {

    Rooms.initialize();

    this.$roomButton.click(function() {
      let roomName = window.prompt('Enter roomname');
      if (!Rooms.isPresent(roomName)) { Rooms.createNewRoom(roomName); }
    });

    this.$refresh.click(function() {
      App.reloadPage();
    });

    this.$select.change();
  },

  appendUpstreamRooms: function(results) {
    for (let key in results) {
      let {roomname, username, text} = results[key];

      if (Rooms.isFiltered(roomname)) {
        let messageObj = {username: username, message: text};
        if (!Rooms.isPresent(roomname)) { Rooms.createNewRoom(roomname); }
        Rooms.addMessage(roomname, messageObj);
      }
    }
  },

  appendRooms: function(results) {
    for (let key in results) {
      let {Room, User, text} = results[key];
      let roomname = Room.roomname, username = User.username;

      if (Rooms.isFiltered(roomname)) {
        let messageObj = {username: username, message: text};
        if (!Rooms.isPresent(roomname)) { Rooms.createNewRoom(roomname); }
        Rooms.addMessage(roomname, messageObj);
      }
    }
  },

  renderSelectedRoom: function() {
    this.$select.change(function() {
      MessagesView.$chats.html('');

      let selectedRoomName = this.value;
      let selectedRoom = Rooms.getSelectedRoom(selectedRoomName);
      Rooms.renderRoomMessages(selectedRoom);
    });
  },

  reRenderSelectedRoom: function() {
    MessagesView.$chats.html('');

    let selectedRoomName = Rooms.currentRoom;
    let selectedRoom = Rooms.getSelectedRoom(selectedRoomName);
    Rooms.renderRoomMessages(selectedRoom);
  },

  renderRoom: function(roomName) {
    MessagesView.$chats.html('');

    let selectedRoom = Rooms.getSelectedRoom(roomName);
    Rooms.renderRoomMessages(selectedRoom);
  },

  renderLocalMessage: (message) => {
    App.startSpinner();
    MessagesView.$chats.html('');

    let {roomname, username, text} = message;
    let messageObj = {username: username, message: text};
    Rooms.addLocalMessage(roomname, messageObj);

    let selectedRoom = Rooms.getSelectedRoom(roomname);
    Rooms.renderRoomMessages(selectedRoom);
    App.stopSpinner();
  }
};