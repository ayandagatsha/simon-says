var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started= false;

$(document).keydown(function() {
    if (!(started)) {
        $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          
          nextSequence();
        }, 1000);
      }
  } else {

playSound("wrong");
$("body").addClass("game-over");

setTimeout(function () {
          
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
  }
  
}

function startOver(){
    level = 0;
    gamePattern = [];
    started=false;

}


function nextSequence() {
      userClickedPattern = [];
      level++;
  $("h1").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(".btn#" + randomChosenColour)
    .fadeOut(250)
    .fadeIn(250);

  playSound(randomChosenColour);
}

function playSound(name) {
  switch (name) {
    case "blue":
      var blu = new Audio("sounds/blue.mp3");
      blu.play();
      break;
    case "green":
      var gree = new Audio("sounds/green.mp3");
      gree.play();
      break;
    case "red":
      var re = new Audio("sounds/red.mp3");
      re.play();
      break;
    case "yellow":
      var yell = new Audio("sounds/yellow.mp3");
      yell.play();
      break;
      case "wrong":
        var wro = new Audio("sounds/wrong.mp3");
        wro.play();
        break;

    default:

      break;
  }
}

function animatePress(currenctColour) {
  $("#" + currenctColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currenctColour).removeClass("pressed");
  }, 100);
}
