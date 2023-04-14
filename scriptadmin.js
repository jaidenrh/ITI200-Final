// Password for accessing the admin page
var password = "Homk0487!";

// Get the password input and the content div
var passwordInput = document.getElementById("password");
var contentDiv = document.querySelector(".content");

// Hide the content div by default
contentDiv.classList.add("hidden");

// Add a submit event listener to the form
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent form submission
  var enteredPassword = passwordInput.value;
  
  // Check if the entered password is correct
  if (enteredPassword === password) {
    // If correct, show the content div and hide the password box
    contentDiv.classList.remove("hidden");
    document.querySelector(".password-box").classList.add("hidden");
  } else {
    // If incorrect, show an error message
    alert("Incorrect password!");
  }
});
