// Get the username parameter from the URL
const socket = new WebSocket('ws://localhost:8080');
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');


// Use the username variable in your code
console.log('Username:', username);
var currUser = document.querySelector('.username');
currUser.append(username);

var wheelValues = [
  { number: 37, color: 'green' },
  { number: 27, color: 'red' },
  { number: 10, color: 'black' },
  { number: 25, color: 'red' },
  { number: 29, color: 'black' },
  { number: 12, color: 'red' },
  { number: 8, color: 'black' },
  { number: 19, color: 'red' },
  { number: 31, color: 'black' },
  { number: 18, color: 'red' },
  { number: 6, color: 'black' },
  { number: 21, color: 'red' },
  { number: 33, color: 'black' },
  { number: 16, color: 'red' },
  { number: 4, color: 'black' },
  { number: 23, color: 'red' },
  { number: 35, color: 'black' },
  { number: 14, color: 'red' },
  { number: 2, color: 'black' },
  { number: 0, color: 'green'},
  { number: 28, color: 'black' },
  { number: 9, color: 'red' },
  { number: 26, color: 'black' },
  { number: 30, color: 'red' },
  { number: 11, color: 'black' },
  { number: 7, color: 'red' },
  { number: 20, color: 'black' },
  { number: 32, color: 'red' },
  { number: 17, color: 'black' },
  { number: 5, color: 'red' },
  { number: 22, color: 'black' },
  { number: 34, color: 'red' },
  { number: 15, color: 'black' },
  { number: 3, color: 'red' },
  { number: 24, color: 'black' },
  { number: 36, color: 'red' },
  { number: 13, color: 'black' },
  { number: 1, color: 'red' }
];
socket.addEventListener('message', function(event) {
  const data = JSON.parse(event.data);
  const winningNumber = data.number;
  spinRoulette(winningNumber);
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
      return wheelValues[i].color;
    }
  }
}
