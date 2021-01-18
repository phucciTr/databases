var Messages = {
  renderMessage: function(message) {
    var html = MessageView.render(message);
    $('#chats').append(html);
  }
};