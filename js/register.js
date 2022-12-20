$(document).ready(function() {
  var username;
  var password;
  var users = {};

  $('#signUpBtn').click(function(){
    username = $('#username').val();
    password = $('#password').val();
    repeat_password = $('#password_confirm').val();


    if(username in users){
      showValidate($('#username'));
      return false;
    }

    if(username.length < 5 || username.length > 15){
      showValidateLength($('#username'));
      return false;
    }

    if(password.length == 0){
      showValidate($('#password'));
      return false;
    }

    if(password.length < 6 || password.length > 30){
      showValidateLength($('#password'));
      return false;
    }

    if(repeat_password.length == 0 || repeat_password != password) {
      showValidate($('#password_confirm'));
      return false;
    }

    users[username] = password;

    console.log(users);
    //localStorage['users'] = JSON.stringify(users)
    storeToLocal("users", users);
    window.location.href = "../index.html";
    return false;


  });

  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
         hideValidate(this);
         hideValidateLength(this);
      });
  });

  function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
  }

  function showValidateLength(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate-short');
  }

  function hideValidateLength(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate-short');
  }

  function storeToLocal(key, users) {
    localStorage[key] = JSON.stringify(users);
  }

  function getFromLocal(key) {
    if (localStorage[key])
      return JSON.parse(localStorage[key]);
    else
      return [];
  }

});
