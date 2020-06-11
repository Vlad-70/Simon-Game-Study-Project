var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = 0;

// Start the Game
$(document).keypress(function() {
    if (startGame === 0) {
    nextSequence();
  $('h1').text('Level 1');
  startGame++;
  }
})

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var newButton = $('#' + randomChosenColour);
  newButton.fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $('h1').text('Level ' + level);
}

//Button Click Event Listener
$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

// Play Sound
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// Animation of buttons
function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed').delay(100).queue(function() {
    $(this).removeClass("pressed").dequeue();
  })
}

// Check Current Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern.length = 0;
      // or userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1500);
    }
  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('h1').text('Game Over, Press Any Key to Restart');
    $('body').addClass('game-over').delay(200).queue(function() {
      $(this).removeClass("game-over").dequeue();
    });
    startOver();
  }
}

function startOver() {
  level = 0;
  startGame = 0;
  gamePattern = [];
  userClickedPattern = [];
}
