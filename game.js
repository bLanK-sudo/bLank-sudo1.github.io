var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(300).fadeOut(300).fadeIn(300);
  gamePattern.push(randomChosenColor);
  console.log("gamePattern:" + gamePattern);

}
var pressed = false;
var level = 0;

$(document).keydown(function(){
  if(!pressed){
    nextSequence();
    pressed = true;
  }
  $("h2").text("");
})
$(".btn").click(function(e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern:" + userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("scale");
  setTimeout(function() {
    $("#" + currentColor).removeClass("scale");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    var count = 0;
    for(i=0; i<gamePattern.length; i++){
      if(gamePattern[i] === userClickedPattern[i]){
        count++;
      }
    if(count == gamePattern.length){
      console.log("success");
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    }
  }else{
    console.log("wrong");
    console.log("wrong");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press a key to restart");
      $("h2").text("(Press Any Key to Restart)")
      startOver();
  }
}

// Reset every variable -------------

function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}
