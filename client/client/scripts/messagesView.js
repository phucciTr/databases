var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    Friends.initialize();
  },

  renderMessages: function(selectedRoom) {
    for (let messageObj of selectedRoom) {
      Messages.renderMessage(messageObj);
    }
  }
};
