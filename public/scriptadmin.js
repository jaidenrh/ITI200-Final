// Password for accessing the admin page
var ssefiesifisef = "Homk0487!";

// Get the password input and the content div
var passwordInput = document.getElementById("password");
var contentDiv = document.querySelector(".content");

// Hide the content div by default
contentDiv.classList.add("hidden");

// Define the socket variable in a higher scope
var socket;

// Add a submit event listener to the form
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent form submission
  var enteredPassword = passwordInput.value;
  
  // Check if the entered password is correct
  if (enteredPassword === ssefiesifisef) {
    // If correct, show the content div and hide the password box
    contentDiv.classList.remove("hidden");
    document.querySelector(".password-box").classList.add("hidden");
    
    // Connect to the server and store the socket object
    socket = new WebSocket("ws:18.212.13.223:8080");
    
  } else {
    // If incorrect, show an error message
    alert("Incorrect password!");
  }
});


function spin() {
  // Get the button element
  let button = document.getElementById('spin-button');

  // Add the "btn-danger" class to the button
  button.classList.add('btn-danger');

  // Generate a random number
  let number = Math.floor(Math.random() * 38);
  console.log(number);

  // Send the number to the server using the WebSocket
  socket.send(JSON.stringify({ number }));

  // Remove the "btn-danger" class from the button after 7 seconds
  setTimeout(function() {
    button.classList.remove('btn-danger');
  }, 8000);
}

function order66() {
  let number = 66;
  socket.send(JSON.stringify({ number }));
}

document.getElementById("spin-button").addEventListener("click", function() {
  spin();
});

document.getElementById("rick-button").addEventListener("click", function() {
  order66();
});


function giveMoneyToAllUsers() {
      $.ajax({
      url: '/all-money',
      method: 'POST',
      data: {amount: 500},
      success: function(data) {
        console.log("Adding money...");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', textStatus, errorThrown);
      }
    });
}

function takeMoneyFromAllUsers() {
      $.ajax({
      url: '/null-money',
      method: 'POST',
      data: {amount: 0},
      success: function(data) {
        console.log("Removing money...");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', textStatus, errorThrown);
      }
    });
}

document.getElementById("give-money-button").addEventListener("click", function() {
  giveMoneyToAllUsers();
});

document.getElementById("take-money-button").addEventListener("click", function() {
  takeMoneyFromAllUsers();
});
