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
    socket = new WebSocket("ws:http://ec2-34-230-43-128.compute-1.amazonaws.com:8080");
    
  } else {
    // If incorrect, show an error message
    alert("Incorrect password!");
  }
});


function spin() {
  let number = Math.floor(Math.random() * 38);
  console.log(number);
  socket.send(JSON.stringify({ number }));
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
  let amount = 100; 
  
  fetch("/give-money-to-all-users", {
    method: "POST",
    body: JSON.stringify({ amount }),
    headers: { "Content-Type": "application/json" }
  });
  
}

document.getElementById("give-money-button").addEventListener("click", function() {
  giveMoneyToAllUsers();
});
