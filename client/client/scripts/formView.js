var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    event.preventDefault();

    let message = {
      username: App.username,
      text: $('#message').val(),
      roomname: $('select').val()
    };

    Parse.create(message, RoomsView.renderLocalMessage(message));
    $('#message').val('');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }
};