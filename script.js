// Get the username from localStorage
var savedUsername = localStorage.getItem('username');

// If a username is found, redirect to wheel.html with the saved username
if (savedUsername) {
  window.location.href = 'wheel.html?username=' + encodeURIComponent(savedUsername);
}

// If no saved username is found, display the login form
else {
  // code for displaying the login form
}

// Save the username to localStorage when the user submits the form
var form = document.getElementById('login-form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission
  var username = document.getElementById('username').value;
  localStorage.setItem('username', username);
  window.location.href = 'wheel.html?username=' + encodeURIComponent(username);
});
