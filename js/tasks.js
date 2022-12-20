$(document).ready(function() {

  var myTasks = getFromLocal('memos');
  var completedTasks = getFromLocal('completedTasks')
  var index;
  var completedTasksIndex;
  var editTaskIndex;
  var id = 0;
  var title;
  var desc;
  var location;
  var date;
  var time;
  var priority;
  var difficulty;
  var progress;

  loadList(myTasks);
  taskProgressList(myTasks);
  completedTaskList(completedTasks);


  /*
  $('#taskTitle').keypress(function(e){
  if(e.which === 13) {
  	if ($('#taskTitle').val().length !== 0)
  		$('#createTaskBtn').click();
  }
  }); */



  var modal = document.getElementById("createTaskModal");
  var viewTaskModal = document.getElementById("viewTaskModal");
  var span = document.getElementsByClassName("close")[0];

  loggedUser = getFromLocal('loggedUser');

  $("#greeting").text($("#greeting").text().replace("User", loggedUser));





  /* When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  } */

  $(".meter > span").each(function() {
    $(this)
      .data("origWidth", $(this).width())
      .width(0)
      .animate({
          width: $(this).data("origWidth")
        },
        1200
      );
  });

  $('#createTaskPopUpBtn').click(function() {
    modal.style.display = "block";
  });

  $('#clearTasksBtn').click(function() {

    let text = "Are you sure you want to delete all tasks?\nYou won't be able to undo this action.";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      myTasks = []
      loadList(myTasks);
      storeToLocal("memos", myTasks);

    } else {
      text = "You canceled!";
    }
    document.getElementById("demo").innerHTML = text;


  });

  $('#completeTaskBtn').click(function() {
    var completedTask = myTasks[index];

    completedTasks.push(completedTask);
    console.log(completedTasks);



    myTasks.splice(index, 1);
    storeToLocal('memos', myTasks);
    storeToLocal('completedTasks', completedTasks);
    loadList(myTasks);
  });





  $('#taskTitle').keypress(function(e) {
    if (e.which === 13) {
      if ($('#taskTitle').val().length !== 0)
        $('#createTaskBtn').click();
    }
  });

  // CREATE A TASK
  $('#createTaskBtn').click(function() {
    var title = $('#taskTitle').val();
    var desc = $('#taskDesc').val();
    var location = $('#taskLocation').val();
    var date = $('#taskDate').val();
    var time = $('#taskTime').val();
    var priority = $('#dropdownPriorityLvl').val();
    var difficulty = $('#dropdownDifficulty').val();
    var progress = 0;

    var requiredName = document.getElementById('required-name');
    requiredName.style.display = "none";

    var requiredDate = document.getElementById('missing-date');
    requiredDate.style.display = "none";

    var invalidDate = document.getElementById('invalid-date');
    invalidDate.style.display = "none";

    var dateCheck = moment(date, "YYYY-MM-DD");
    console.log(dateCheck.isValid());

    if(title.length == 0){
      requiredName.style.display = "block";
      //$('#createTaskModal').scrollTop(0);
      document.getElementById("taskTitle").scrollIntoView();
    }
    else if (date.length == 0){
      requiredDate.style.display = "block";
      document.getElementById("taskDate").scrollIntoView();
    }

    else if (dateCheck.isValid() == false){
      invalidDate.style.display = "block";
      document.getElementById("taskDate").scrollIntoView();
    }

    else{

      window.location.href="tasks.html";
      modal.style.display = "none";

      var currentTask = [$("#taskTitle").val(), $("#taskDesc").val(), $('#taskLocation').val(), $("#taskDate").val(), $("#taskTime").val(), $('#priority').val(), $('#difficulty').val(), progress];


      myTasks.push(currentTask);
      loadList(myTasks);
      storeToLocal('memos', myTasks);

    }

    //window.alert(currentTask);
    //console.log(title);
    //$('#taskTitle').val('');


  });




  //Task deletion
  $('ul').delegate("span", "click", function(event) {
    event.stopPropagation();

    let text = "Do you want to delete this task?\nYou won't be able to undo this action.";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      index = $('span').index(this);
      offset = index - 9;
      console.log("Clicked on item " + index)
      $('li').eq(offset).remove();
      myTasks.splice(offset, 1);

      taskProgressList(myTasks)
      storeToLocal('memos', myTasks);

    } else {
      text = "You canceled!";
    }
    document.getElementById("demo").innerHTML = text;
  });


  $('#tasks-completed ul').delegate("span", "click", function(event) {
    event.stopPropagation();

    completedTasksIndex = $('span').index(this);
    offset = completedTasksIndex - 9;
    console.log("Clicked on item " + completedTasksIndex);
    $('li').eq(offset).remove();
    completedTasks.splice(offset, 1);

    storeToLocal('completedTasks', completedTasks);
  });



  //View a task
  $('#high-prio-tasks ul').delegate('li', 'click', function() {

    index = $('li').index(this);
    var contents = myTasks[index];
    console.log("index is: "+index);

    title = contents[0];
    desc = contents[1];
    location = contents[2];
    date = contents[3];
    time = contents[4];
    priority = contents[5];
    difficulty = contents[6];
    progress = contents[7];

    const progressList = myTasks.sort(
      (taskA, taskB) =>
      taskA[7] - taskB[7] ||
      taskA[0].localeCompare(taskB[0]),
    )


    $("#viewTitle").text(title);
    $("#viewDesc").text(desc);
    $("#viewLocation").text(location);
    $("#viewDate").text(date);
    $("#viewTime").text(time);
    $("#viewPriority").text(priority);
    $("#viewDifficulty").text(difficulty);
    $("#viewProgress").text(progress + "%");

    window.location.href = 'tasks.html#view-task';
    viewTaskModal.style.display = "block";

  });

  //View a task
  $('#med-prio-tasks ul').delegate('li', 'click', function() {

    index = $('li').index(this);
    var contents = myTasks[index];
    console.log("index is: "+index);

    title = contents[0];
    desc = contents[1];
    location = contents[2];
    date = contents[3];
    time = contents[4];
    priority = contents[5];
    difficulty = contents[6];
    progress = contents[7];

    const progressList = myTasks.sort(
      (taskA, taskB) =>
      taskA[7] - taskB[7] ||
      taskA[0].localeCompare(taskB[0]),
    )


    $("#viewTitle").text(title);
    $("#viewDesc").text(desc);
    $("#viewLocation").text(location);
    $("#viewDate").text(date);
    $("#viewTime").text(time);
    $("#viewPriority").text(priority);
    $("#viewDifficulty").text(difficulty);
    $("#viewProgress").text(progress + "%");

    window.location.href = 'tasks.html#view-task';
    viewTaskModal.style.display = "block";

  });

  //View a task
  $('#low-prio-tasks ul').delegate('li', 'click', function() {

    index = $('li').index(this);
    var contents = myTasks[index];
    console.log("index is: "+index);

    title = contents[0];
    desc = contents[1];
    location = contents[2];
    date = contents[3];
    time = contents[4];
    priority = contents[5];
    difficulty = contents[6];
    progress = contents[7];

    const progressList = myTasks.sort(
      (taskA, taskB) =>
      taskA[7] - taskB[7] ||
      taskA[0].localeCompare(taskB[0]),
    )


    $("#viewTitle").text(title);
    $("#viewDesc").text(desc);
    $("#viewLocation").text(location);
    $("#viewDate").text(date);
    $("#viewTime").text(time);
    $("#viewPriority").text(priority);
    $("#viewDifficulty").text(difficulty);
    $("#viewProgress").text(progress + "%");

    window.location.href = 'tasks.html#view-task';
    viewTaskModal.style.display = "block";

  });

  $('#editTaskPopUpBtn').click(function() {
    var editModal = document.getElementById("editTaskModal");

    editModal.style.display = "block";


    $('#editTaskTitle').val(myTasks[editTaskIndex][0]);
    $('#editTaskDesc').val(myTasks[editTaskIndex][1]);
    $('#editTaskLocation').val(myTasks[editTaskIndex][2]);
    $('#editTaskDate').val(myTasks[editTaskIndex][3]);
    $('#editTaskTime').val(myTasks[editTaskIndex][4]);
    $('#editTaskPriority').val(myTasks[editTaskIndex][5]);
    $('#editTaskDifficulty').val(myTasks[editTaskIndex][6]);
    $('#editTaskProgress').val(myTasks[editTaskIndex][7]);

  });

  $('#editATaskBtn').click(function() {
    var chooseModal = document.getElementById("chooseTaskModal");

    chooseTasktoEdit(myTasks);

    chooseModal.style.display = "block";


  });

  $('#saveEditBtn').click(function() {

    title = $('#editTaskTitle').val();
    desc = $('#editTaskDesc').val();
    location = $('#editTaskLocation').val();
    date = $('#editTaskDate').val();
    time = $('#editTaskTime').val();
    priority = $('#editTaskPriority').val();
    difficulty = $('#editTaskDifficulty').val();
    progress = $('#editTaskProgress').val();

    var requiredName = document.getElementById('edit-missing-name');
    requiredName.style.display = "none";

    var invalidDate = document.getElementById('edit-invalid-date');
    invalidDate.style.display = "none";

    var dateCheck = moment(date, "YYYY-MM-DD");
    console.log(dateCheck.isValid());

    if(title.length == 0){
      requiredName.style.display = "block";
      //$('#createTaskModal').scrollTop(0);
      document.getElementById("editTaskTitle").scrollIntoView();
    }
    else if (date.length == 0){
      invalidDate.style.display = "block";
      document.getElementById("editTaskDate").scrollIntoView();
    }

    else{
      var updatedTask = [$('#editTaskTitle').val(), $('#editTaskDesc').val(), $('#editTaskLocation').val(), $('#editTaskDate').val(), $('#editTaskTime').val(), $('#editTaskPriority').val(), $('#editTaskDifficulty').val(), $('#editTaskProgress').val()];

      myTasks[index] = updatedTask;
      loadList(myTasks);
      taskProgressList(myTasks);
      storeToLocal("memos", myTasks);

      window.location.href="tasks.html";

    }


  });

  //Choose task to edit
  $('#choose-task ul').delegate('li', 'click', function() {

    index = $('#choose-task li').index(this);
    console.log("index is "+index);


    $('#editTaskTitle').val(myTasks[index][0]);
    $('#editTaskDesc').val(myTasks[index][1]);
    $('#editTaskLocation').val(myTasks[index][2]);
    $('#editTaskDate').val(myTasks[index][3]);
    $('#editTaskTime').val(myTasks[index][4]);
    $('#editTaskPriority').val(myTasks[index][5]);
    $('#editTaskDifficulty').val(myTasks[index][6]);
    $('#editTaskProgress').val(myTasks[index][7]);


    var editTaskModal = document.getElementById('editTaskModal')
    window.location.href = 'tasks.html#edit-task';
    editTaskModal.style.display = "block";


  });


  /*
  $('#edit-button').click(function(){
  myTasks[index] = $('#edit-input').val();
  loadList(myTasks);
  storeToLocal("memos", myTasks);
  });

  */

  function loadList(myTasks) {
    $('#high-prio-tasks li').remove();

    if (myTasks.length > 0) {
      for (var i = 0; i < myTasks.length; i++) {
        if (myTasks[i][5] == 'High') {
          $('#high-prio-tasks ul').append('<li class= "list-group-item my-list-items" title="Click to view this task">' + myTasks[i][0] + '<span class="bi bi-trash-fill" title="Click to delete task"></span></li>');
        }
        if (myTasks[i][5] == 'Medium') {
          $('#med-prio-tasks ul').append('<li class= "list-group-item my-list-items" title="Click to view this task">' + myTasks[i][0] + '<span class="bi bi-trash-fill" title="Click to delete task"></span></li>');
        }
        if (myTasks[i][5] == 'Low') {
          $('#low-prio-tasks ul').append('<li class= "list-group-item my-list-items" title="Click to view this task">' + myTasks[i][0] + '<span class="bi bi-trash-fill" title="Click to delete task"></span></li>');
        }
      }
    }


  };

  function taskProgressList(myTasks) {

    const progressList = myTasks.sort(
      (taskA, taskB) =>
      taskA[7] - taskB[7] ||
      taskA[0].localeCompare(taskB[0]),
    )

    $('#tasks-progress li').remove();

    if (progressList.length > 0) {
      for (var i = 0; i < progressList.length; i++) {

          $('#tasks-progress ul').append('<li class= "list-group-item my-list-items">' + progressList[i][0] + ' <div class="item-progress">'+ progressList[i][7] +'% <meter value="' + (progressList[i][7])/100 + '">%</meter></div></li>');

      }
    }

  };

  function chooseTasktoEdit(myTasks) {

    $('#choose-task li').remove();

    if (myTasks.length > 0) {
      for (var i = 0; i < myTasks.length; i++) {

          $('#choose-task ul').append('<li class= "list-group-item my-list-items">' + myTasks[i][0] + '</li>');

      }
    }

  };

  function completedTaskList(completedTasks) {

    $('#tasks-completed li').remove();

    if (completedTasks.length > 0) {
      for (var i = 0; i < completedTasks.length; i++) {

          $('#tasks-completed ul').append('<li class= "list-group-item my-list-items">' + completedTasks[i][0] + '<span class="bi bi-trash-fill" title="Click to delete task"></span></li>');

      }
    }
  }

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
