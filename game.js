var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = -1;

function nextSequence() {
  userClickedPattern = [];

  level = level + 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour)

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
}

$(".btn").on("click", function(event) {
  if(level===-1) nextSequence();

  else{
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    var len = userClickedPattern.length;
    checkAnswer(len - 1);

    makeSound(this.id);
    animatePress(this.id);
  }
});

$(document).keypress(function() {
  if (level===-1) nextSequence();
});

function makeSound(sound) {

  switch (sound) {
    case "blue":
      var audio = new Audio('sounds/blue.mp3');
      audio.play();
      break;
    case "red":
      var audio = new Audio('sounds/red.mp3');
      audio.play();
      break;
    case "green":
      var audio = new Audio('sounds/green.mp3');
      audio.play();
      break;
    case "yellow":
      var audio = new Audio('sounds/yellow.mp3');
      audio.play();
      break;
    default: break;
  }
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }
  else{
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key/Tile to Restart");

    startOver();

  }

}
function startOver(){
  level = -1;
  gamePattern = [];
}
