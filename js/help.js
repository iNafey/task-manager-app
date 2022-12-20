$(document).ready(function() {
  const checkbox = document.getElementById('checkbox');

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

  checkbox.addEventListener('change', () => {
    darkTheme();
    //storeToLocal("theme", "dark");
  })

  function darkTheme() {
    var sidebar = document.getElementById('sidebar');
    var helpWindow = document.getElementById('help-text')

    document.body.classList.toggle('dark');
    sidebar.classList.toggle('dark');
    helpWindow.classList.toggle('dark');
  }

  function logout() {
    let text = "You won't be able to access any features!\nAre you sure you want to log out?";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      window.location.href = "../index.html";
      storeToLocal('loggedUser', '');
    } else {
      text = "You canceled!";
    }
    document.getElementById("demo").innerHTML = text;
  }

  class DigitalClock {
    constructor(element) {
      this.element = element;
    }

    start() {
      this.update();

      setInterval(() => {
        this.update();
      }, 500);
    }

    update() {
      const parts = this.getTimeParts();
      const minuteFormatted = parts.minute.toString().padStart(2, "0");
      const timeFormatted = `${parts.hour}:${minuteFormatted}`;
      const amPm = parts.isAm ? "AM" : "PM";

      this.element.querySelector(".clock-time").textContent = timeFormatted;
      this.element.querySelector(".clock-ampm").textContent = amPm;
    }

    getTimeParts() {
      const now = new Date();

      return {
        hour: now.getHours() % 12 || 12,
        minute: now.getMinutes(),
        isAm: now.getHours() < 12
      };
    }
  }

  const clockElement = document.querySelector(".clock");
  const clockObject = new DigitalClock(clockElement);



  clockObject.start();

  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  const dateToday = document.getElementById("current-date").innerHTML = date;

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
