var urlParams = new URLSearchParams(window.location.search);
var username = localStorage.getItem('username');
var betType = '';
var currMoney;
var winnings;
console.log('Username:', username);


  

  $(document).ready(function() {
  $('#currUser').append(username);
  if (username) {
    getMoney();
    }
  });

 $(document).ready(function() {
  $('#bet-form1').submit(function(e) {
    e.preventDefault();
    betType = 'color';
    var betAmount = $('#amount1').val();
    if (betAmount <= currMoney && betAmount > 0) {
      localStorage.setItem('bet1Amount', betAmount);
      localStorage.setItem('bet1Color', $('#color').val());
      $('#currBet').text('$' + localStorage.getItem('bet1Amount') + ' on ' + localStorage.getItem('bet1Color'));
      document.getElementById("bet-form1").reset();
    } else {
      alert("Not enough shekels bozo.");
    }
  });

  $('#bet-form2').submit(function(e) {
    e.preventDefault();
    betType = 'number';
    var betAmount = $('#amount2').val();
    if (betAmount <= currMoney && betAmount > 0) {
      localStorage.setItem('bet2Amount', betAmount);
      localStorage.setItem('bet2Number', $('#number').val());
      $('#currBet').text('$' + localStorage.getItem('bet2Amount') + ' on ' + localStorage.getItem('bet2Number'));
      document.getElementById("bet-form2").reset();
    } else {
      alert("Not enough shekels bozo.");
    }
  });
});






// Get the username parameter from the URL
const socket = new WebSocket('ws:34.230.43.128:8080');



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
      if(winningNumber == 66) {
        ricky();
      } 
    else {
      spinRoulette(winningNumber);
    }
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
    checkBets(winningNumber);
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

function getMoney() {
  $.ajax({
      url: '/get-money',
      method: 'POST',
      data: {username: username},
      success: function(data) {
        $('#currMoney').text('Money: ' + data.money);
        currMoney = parseFloat(data.money);
        console.log(currMoney);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', textStatus, errorThrown);
      }
    });
}

function removeMoney(amount) {
  $.ajax({
      url: '/remove-money',
      method: 'POST',
      data: {username: username,
             amount: amount
            },
      success: function(data) {
        getMoney();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', textStatus, errorThrown);
      }
    });
}

function addMoney(amount) {
  $.ajax({
      url: '/add-money',
      method: 'POST',
      data: {username: username,
             amount: amount
            },
      success: function(data) {
        getMoney();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', textStatus, errorThrown);
      }
    });

}

function ricky() {
 $(document).ready(function() {
  const container = document.getElementById('player');
  const video = document.getElementById('my-video');

  container.style.display = 'block';
  video.style.display = 'block';

  video.play();
});
}


function checkBets(winningNumber) {
  if(betType == 'color') {
    if(localStorage.getItem('bet1Color') == getWinningColor(winningNumber)) {
      addMoney(localStorage.getItem('bet1Amount'));
      console.log("You Won");
      $('.alert-success').text('You won!').show();
      setTimeout(function() {
        $('.alert-success').hide();
      }, 3000); // hide the alert after 3 seconds
    }
    else{
      console.log("You Lost");
      removeMoney(localStorage.getItem('bet1Amount'));
      $('.alert-danger').text('L!').show();
      setTimeout(function() {
        $('.alert-danger').hide();
      }, 3000); // hide the alert after 3 seconds
    }
  }
  else if(betType == 'number') {
    if(localStorage.getItem('bet2Number') == winningNumber) {
      winnings = localStorage.getItem('bet2Amount') * 35;
      addMoney(winnings);
      console.log("You Won");
      $('.alert-success').text('You won!').show();
      setTimeout(function() {
        $('.alert-success').hide();
      }, 3000); // hide the alert after 3 seconds
    }
    else{
      console.log("You Lost");
      removeMoney(localStorage.getItem('bet2Amount'));
      $('.alert-danger').text('L!').show();
      setTimeout(function() {
        $('.alert-danger').hide();
      }, 3000); // hide the alert after 3 seconds
    }
  }
}
