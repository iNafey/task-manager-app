$(document).ready(function() {
  var username;
  var password;
  var users = getFromLocal('users');

  $('#loginBtn').click(function(){
    var error_message = document.getElementById('incorrect-credentials');
    error_message.style.display = "none";

    username = $('#username').val();
    stringified = "'"+ username + "'";
    console.log(stringified, username);
    password = $('#password').val();


    if(!(username in users)){
      showValidate($('#username'));
      return false;
    }


    if(password.length == 0){
      showValidate($('#password'));
      return false;
    }


    realPassword = users[username];

    console.log(realPassword);

    if(password != realPassword){
      var error_message = document.getElementById('incorrect-credentials');
      error_message.style.display = "block";
      return false;
    }

    window.location.href = "pages/home.html";
    storeToLocal('loggedUser', username);

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
