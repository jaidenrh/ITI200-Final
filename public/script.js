var savedUsername = localStorage.getItem('username');
      console.log(savedUsername);
      var defaultMoney = 500;

      $(document).ready(function() {
        // If a username is found, redirect to wheel.html with the saved username
        if (savedUsername) {
          console.log("Found saved Username")
          // check if the saved username exists in the database
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", "/check-user");
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.onload = function() {
            console.log(this.responseText);
            var userExists = JSON.parse(this.responseText);
            if (userExists == true) {
              console.log("User Exists");
              window.location.href = '/roulette?username=' + encodeURIComponent(savedUsername);
            } 
            if (userExists == false) {
              // if the user doesn't exist, save the username and default money value to the database
              saveUser(savedUsername, defaultMoney);
            }

          };
          xhttp.send("username=" + encodeURIComponent(savedUsername));
        }


      // If no saved username is found, display the login form
      else {
        // code for displaying the login form
      }

      });

      // Save the username and default money value to localStorage and the database when the user submits the form
      var form = document.getElementById('login-form');
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        var username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        localStorage.setItem('money', defaultMoney);
        // check if the entered username exists in the database
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/check-user");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onload = function() {
          var userExists = JSON.parse(this.responseText);
          if (userExists) {
            window.location.href = '/roulette?username=' + encodeURIComponent(username);
          } else {
            // if the user doesn't exist, save the username and default money value to the database
            saveUser(username, defaultMoney);
            window.location.href = '/roulette?username=' + encodeURIComponent(username);
          }
        };
        xhttp.send("username=" + encodeURIComponent(username));
      });

      function saveUser(username, money) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/save-user");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("username=" + encodeURIComponent(username) + "&money=" + encodeURIComponent(money));
        console.log("Saving User...");
        window.location.href = '/roulette?username=' + encodeURIComponent(savedUsername);
      }