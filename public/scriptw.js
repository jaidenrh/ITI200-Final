var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
console.log('Username:', username);

$(document).ready(function() {
  $('#currUser').append(username);
});


// Get the username parameter from the URL
const socket = new WebSocket('ws://10.0.0.250:8080');



// Use the username variable in your code



var wheelValues = [
  { number: 37, color: 'Green' },
  { number: 27, color: 'Red' },
  { number: 10, color: 'Black' },
  { number: 25, color: 'Red' },
  { number: 29, color: 'Black' },
  { number: 12, color: 'Red' },
  { number: 8, color: 'Black' },
  { number: 19, color: 'Red' },
  { number: 31, color: 'Black' },
  { number: 18, color: 'Red' },
  { number: 6, color: 'Black' },
  { number: 21, color: 'Red' },
  { number: 33, color: 'Black' },
  { number: 16, color: 'Red' },
  { number: 4, color: 'Black' },
  { number: 23, color: 'Red' },
  { number: 35, color: 'Black' },
  { number: 14, color: 'Red' },
  { number: 2, color: 'Black' },
  { number: 0, color: 'Green'},
  { number: 28, color: 'Black' },
  { number: 9, color: 'Red' },
  { number: 26, color: 'Black' },
  { number: 30, color: 'Red' },
  { number: 11, color: 'Black' },
  { number: 7, color: 'Red' },
  { number: 20, color: 'Black' },
  { number: 32, color: 'Red' },
  { number: 17, color: 'Black' },
  { number: 5, color: 'Red' },
  { number: 22, color: 'Black' },
  { number: 34, color: 'Red' },
  { number: 15, color: 'Black' },
  { number: 3, color: 'Red' },
  { number: 24, color: 'Black' },
  { number: 36, color: 'Red' },
  { number: 13, color: 'Black' },
  { number: 1, color: 'Red' }
];

socket.addEventListener('message', function(event) {
  event.data.text().then(function(text) {
    try {
      const data = JSON.parse(text);
      const winningNumber = data.number;
      spinRoulette(winningNumber);
    } catch (e) {
      console.error(e);
    }
  });
});



function spinRoulette(winningNumber) {
  document.getElementById('roulette-wheel').style.transform = 'rotate(0deg)';
  var spinDegrees = calculateSpinDegrees(winningNumber);

  // Subtract the degree value of the starting position (which is 0 for 00 at the top)
  spinDegrees -= 1440;

  document.getElementById('roulette-wheel').style.transform = 'rotate(' + spinDegrees + 'deg)';

  setTimeout(function() {
    if(winningNumber != 37) {
      var resultText = winningNumber + ' (' + getWinningColor(winningNumber) + ')';
    } else {
      var resultText = '00' + ' (' + getWinningColor(winningNumber) + ')';
    }
    document.getElementById('result').innerHTML = resultText;
    document.getElementById('result').className = getWinningColor(winningNumber);
    // Reset the wheel after 5 seconds
    setTimeout(function() {
      document.getElementById('roulette-wheel').style.transform = 'rotate(0deg)';
    }, 5000);
  }, 3000);
}


function calculateSpinDegrees(inputNumber) {
  var index = wheelValues.findIndex(function(value) {
    return value.number == inputNumber;
  });
  if (index === -1) {
    console.log('Error: Invalid input number');
    return;
  }
  var degreesPerSegment = 360 / wheelValues.length;
  var angle = 360 - (index * degreesPerSegment) - (degreesPerSegment / 2);
  angle += degreesPerSegment / 2; // subtract half the degrees per segment value
  return angle;
}

function getWinningColor(winningNumber) {
  for (var i = 0; i < wheelValues.length; i++) {
    if (wheelValues[i].number === winningNumber) {
      console.log(wheelValues[i].color);
      return wheelValues[i].color;

    }
  }
}

function makeBetColor() {

}

function makeBetNumber() {

}

function checkBets() {

}
