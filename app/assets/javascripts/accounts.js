
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
    return false;
  });

  $('#login-link').on('click', function() {
    $('#login-div').show();
    return false;
  });

  $('#logout-link').on('click', function() {
    return false;
  });

  $('#login-button').on('click', function() {
    var session = sessionParam();
    loginSession(session);
    $('#email').val('');
    $('#password').val('');
    $('#login-div').hide();
    $('#login-link').hide();
    $('#signup-link').hide();
    $('#logout-link').show();
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
      //console.log(data.email);
    }
  });
}

function sessionParam() {
  var authenticityToken = $('input[name=authenticity_token]').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var paramObject = {
    email: email,
    password: password,
    authenticity_token: authenticityToken
  }
  return paramObject;
}

function loginSession(paramObject) {

  $.ajax({
    url: '/sessions',
    method: 'post',
    dataType: 'json',
    data: paramObject,
    success: function(data) {
      console.log(data);
    }
  });
}



















