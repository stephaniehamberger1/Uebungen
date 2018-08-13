$(function () {

  var model = new connectFour.Model(); //creates a new connect Four game
  model.init(); //creates the array of the game
  model.toString(); //prints the array of the game

  if(!connectFour.gameOver){ //if the game is not over... (does not work)
      $(window).on("keydown",function(event){//when a key is pressed a token will be inserted

          if(event.keyCode<=105 &&event.keyCode>=97){ //checks if the right keys are pressed
              model.insertTokenAt(event.keyCode-97);
              model.toString(); //prints the current arrays of the array
          }
      });
  }
});



