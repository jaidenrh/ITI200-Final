// Get the username parameter from the URL
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');

// Use the username variable in your code
console.log('Username:', username);

const form = document.getElementById('my-form');
const submitButton = document.getElementById('submit-button');

// show or hide the color or number options depending on the selection made in the bet type dropdown
const betTypeDropdown = document.getElementById('bet-type');
const colorOptions = document.getElementById('color-options');
const numberOptions = document.getElementById('number-options');
const amountToBet = document.getElementById('amount');

betTypeDropdown.addEventListener('change', () => {
  if (betTypeDropdown.value === 'color') {
    colorOptions.style.display = 'block';
    numberOptions.style.display = 'none';
  } else if (betTypeDropdown.value === 'number') {
    colorOptions.style.display = 'none';
    numberOptions.style.display = 'block';
  } else {
    colorOptions.style.display = 'none';
    numberOptions.style.display = 'none';
  }
  submitButton.disabled = true;
});

// enable the submit button if all required fields have inputs
[betTypeDropdown, colorOptions, numberOptions, amountToBet].forEach((dropdown) => {
  const inputs = dropdown.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (betTypeDropdown.value && inputs[0].value && amountToBet.value) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });
  });
});

// submit the form using AJAX
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'submit-form.php'); // replace with the URL of the PHP script that will handle the form submission
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert(xhr.responseText); // show the response from the server
    }
  };
  xhr.send(formData);
});
