
function showHide() {
  var status = $('.user-id-span').data("user");
  if (status == 'no_user') {
    $('#logout-link').hide();
    $('#user_tab_for_click').hide();
    //$('.mapbutton').hide();
  } else {
    $('#login-link').hide();
    $('#signup-link').hide();
    $('#user_tab_for_click').show();
    $('#login_alert').hide();
  }
}

function signUp(paramObject) {
  var authenticityToken = $('input[name=authenticity_token]').val();
  $.ajax({
    url: '/users',
    method: 'post',
    dataType: 'json',
    data: {authenticity_token: authenticityToken, user: paramObject},
    success: function(data) {
      window.location.reload();
    }
  });
}

function userParam() {
  var email = $('#user_email').val();
  var password = $('#user_password').val();
  var paramObject = {
    email: email,
    password: password
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
      window.location.reload();
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

function logOut() {
    var authenticityToken = $('input[name=authenticity_token]').val();
    $.ajax({
      url: '/sessions',
      method: 'delete',
      dataType: 'json',
      data: {authenticity_token: authenticityToken},
      success: function() {
        window.location.reload();
      }
    });
    $('#logout-link').hide();
    $('#login-link').show();
    $('#signup-link').show();
}

function accountSetUp() {
  showHide();

  $('#signup-link').on('click', function() {
    $('#login-div').hide();
    $('#signup-div').dialog();
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
    $('#login-div').dialog();
    $('#signup-div').hide();
    return false;
  });

  $('#login_alert').on('click', function() {
    $('#login-div').dialog();
    $('#signup-div').hide();
    return false;
  });


  $('#logout-link').on('click', function() {
    var authenticityToken = $('input[name=authenticity_token]').val();
    logOut();
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
}


















