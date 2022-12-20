$(document).ready(function() {

  myTasks = getFromLocal('memos');
  loggedUser = getFromLocal('loggedUser');

  $("#greeting").text($("#greeting").text().replace("User", loggedUser));
  $('[data-toggle="tooltip"]').tooltip();

  loadTasks(myTasks);
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

/*
  theme = getFromLocal('theme');

  $(document).unload(function(){
  localStorage.removeItem('theme');
  });

  if (theme == 'dark'){
    $( "#checkbox" ).trigger( "click" );
    darkTheme();
  }
*/
  const checkbox = document.getElementById('checkbox');



  checkbox.addEventListener('change', () => {
    darkTheme();
  })

  function darkTheme() {
    var sidebar = document.getElementById('sidebar');
    var lists = document.getElementsByClassName('my-list-items');
    var highItems = document.getElementById('high-items');
    var medItems = document.getElementById('med-items');
    var lowItems = document.getElementById('low-items');
    var notepad = document.getElementById('notepad');

    document.body.classList.toggle('dark');

    sidebar.classList.toggle('dark');

    for (let i = 0, len = lists.length; i < len; i++) {
      lists[i].classList.toggle('dark');
    }
    highItems.classList.toggle('dark');
    medItems.classList.toggle('dark');
    lowItems.classList.toggle('dark');
    notepad.classList.toggle('dark');
  }

  function loadTasks(myTasks) {

    if (myTasks.length > 0) {
      for (var i = 0; i < myTasks.length; i++) {
        if (myTasks[i][5] == 'High') {
          $('#home-high-tasks ul').append('<li class= "list-group-item my-list-items">' + myTasks[i][0] + ' <div class="item-progress">'+ myTasks[i][7] +'% <meter value="' + (myTasks[i][7])/100 + '">%</meter></div></li>');
        }
        if (myTasks[i][5] == 'Medium') {
          $('#home-med-tasks ul').append('<li class= "list-group-item my-list-items">' + myTasks[i][0] + ' <div class="item-progress">'+ myTasks[i][7] +'% <meter value="' + (myTasks[i][7])/100 + '">%</meter></div></li>');
        }
        if (myTasks[i][5] == 'Low') {
          $('#home-low-tasks ul').append('<li class= "list-group-item my-list-items">' + myTasks[i][0] + ' <div class="item-progress">'+ myTasks[i][7] +'% <meter value="' + (myTasks[i][7])/100 + '">%</meter></div></li>');
        }
      }
    }


  };

  function openTasks(evt, myTasks) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(myTasks).style.display = "block";
    evt.currentTarget.className += " active";
  }

  notepad_content = getFromLocal('notepad_content');
  var notepad = document.getElementById('notepad')
  $('#notepad').text(notepad_content);

  notepad.addEventListener("change", () => {
    text = $('#notepad').val();
    storeToLocal('notepad_content', text);
  });


  function storeToLocal(key, myTasks) {
    localStorage[key] = JSON.stringify(myTasks);
  }

  function getFromLocal(key) {
    if (localStorage[key])
      return JSON.parse(localStorage[key]);
    else
      return [];
  }

});
