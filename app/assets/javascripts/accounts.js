
$(function() {

  $('#signup-link').on('click', function() {
    $('#signup-div').show();
    return false;
  });

  $('#signup-button').on('click', function() {
    var user = userParam();
    signUp(user);
    $('#user_email').val('');
    $('#user_password').val('');
    $('#signup-div').hide();
    $('#login-div').show();
  });

  $('#login-link').on('click', function() {
    $('#login-div').show();
    return false;
  });

});


function userParam() {
  var email = $('#user_email').val();
  var password = $('#user_password').val();
  var paramObject = {
    email: email,
    password: password
  }
  return paramObject;
}


function signUp(paramObject) {
  var authenticityToken = $('input[name=authenticity_token]').val();
  $.ajax({
    url: '/users',
    method: 'post',
    dataType: 'json',
    data: {authenticity_token: authenticityToken, user: paramObject},
    success: function(data) {
      console.log(data.email);
    }
  });
}
