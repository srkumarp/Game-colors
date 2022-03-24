var a = ["red", "blue", "green", "yellow"];
var gamePattern = [];
for (var i = 0; i < 4; i++) {
  $("." + i).css("background-color", a[i]);
}
var score=0;
var chance=0;
var counter=0;
var checkarray=[];
function nextseq() {
  return Math.floor(Math.random() * 4);
}

$('.btn').click(function(event) {
  if(chance == 1){
    const audio = new Audio("sounds/" + a[parseInt($(this).attr("class").split(" ")[1])]+ ".mp3");
    audio.play();
    $(this).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    counter++;
    checkarray.push(a[parseInt($(this).attr("class").split(" ")[1])]);
    if(validate() != true){
      counter=0;
      chance=0;
      checkarray=[];
      $("h1").text("Game over, press A to restart");
      const audio1 = new Audio("sounds/wrong.mp3");
      audio1.play();
      $("h2").text("Score: "+score);
      score=0;
    }
    else{
      if(counter == gamePattern.length && chance== 1){
        counter=0;
        score++;
        $("h2").text("Score: "+score);
        checkarray=[];
        showuser();
      }
    }
    //console.log("sounds/" + a[parseInt($(this).attr("class").split(" ")[1])]+ ".mp3");
  }
});
$(document).on("keydown", function(event) {
  if (event.which == 65 && chance == 0) {
    $("h1").text("Game started");
    $("h2").text("Score: "+score);
    gamePattern=[];
    showuser();
  }
})

function showuser() {
  setTimeout(function(){
    var randomChosenNumber = nextseq();
    var randomChosenColour = a[randomChosenNumber];
    gamePattern.push(randomChosenColour);
    const audio = new Audio("sounds/" + gamePattern[gamePattern.length - 1] + ".mp3");
    audio.play();
    $("." + randomChosenNumber).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    chance=1;
}, 1000);

}

function validate(){
  var flag=true;
  for(var i=0;i<checkarray.length;i++){
    if(checkarray[i] !== gamePattern[i]){
      flag=false;
    }
  }
  return flag;
}
