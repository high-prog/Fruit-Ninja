var playing = false;
var score;
var trialsleft;
var step ,action;
var fruits = ['apple','banana','grapes','greenApple','mango','orange','peach','pear','pineapple','watermelon'];
$(function(){
  $("#startreset").click(function(){
    if(playing == true){
      location.reload();
    }else{
      playing = true;
      
      
      score = 0;
      $("#scoreValue").html(score);


      $("#trials").show();
      trialsleft = 5;
      addHearts();
      $("#gameover").hide();
      $("#startreset").html("Reset Game");

      startAction();
    }
  });

$("#fruit1").mouseover(function(){
  score++;
  $("#scoreValue").html(score);
  $("#slicesound")[0].play();
  clearInterval(action);
  $("#fruit1").hide("explode",500);

  setTimeout(startAction,500);
})

function addHearts(){
  $("#trials").empty();
  for(i=0;i<trialsleft;i++){
    $("#trials").append(' <img src = "images/heart.png" class= "life"> ');
  }
}

function startAction(){
  
  //generating a fruit
  $("#fruit1").show();
  chooseFruit(); 
  $("#fruit1").css({
    'left': Math.round(550*Math.random()),
    'top': -50,
  });
  //generate random step
  step = 1 + Math.round(5*Math.random());
  action = setInterval(function(){
    //move fruit by 1 step
    $("#fruit1").css('top', $("#fruit1").position().top + step);
    //check fruit too low
    if( $("#fruit1").position().top > $("#fruitContainer").height()){
      //check trials
      if(trialsleft>1){
         //generating a fruit
  $("#fruit1").show();
  chooseFruit(); 
  $("#fruit1").css({
    'left': Math.round(550*Math.random()),
    'top': -50,
  });
  //generate random step
  step = 1 + Math.round(5*Math.random());

    //reuce number of trials by 1 
    trialsleft--;
    addHearts();
      }
      else{
        //game over
        playing = false;
        $("#startreset").html("Start Game");
        $("#gameover").show();
        $("#gameover").html('<p>Game Over!</p><p>Your score is:  '+ score + '</p>');
        $("#trials").hide();
        stopAction();
      }
    }

  },10);
}

function chooseFruit(){
  $("#fruit1").attr('src', 'images/'+ fruits[Math.round(8* Math.random())] +'.png');
}

function stopAction(){
  clearInterval(action);
  $("#fruit1").hide();
}

});