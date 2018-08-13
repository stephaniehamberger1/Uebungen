window.connectFour = window.connectFour || {};

(function (namespace, window) {
  'use strict';
    let fields; //Array safes the fields of the game
    let playerMode; //shows which player is playing
    let gameOver; //boolean shows if game is over (does not work in main)

  class Model {

    constructor() {
      this.fields=[];
      this.playerMode=1;
      this.gameOver=false;
    }

    // --------- public ---------

    init() { //fills array with empty (= -) fields, first rows, then columns
        for(let i=0; i<window.connectFour.CONFIG.numRows; i++)
        {
            this.fields[i]=[];
            for(let j=0; j<window.connectFour.CONFIG.numColumns-1; j++){
                this.fields[i][j]='-'; //fills the array with empty fields
            }
        }
    }

    insertTokenAt(columnIndex) { //inserts token at the right position
      if(this.isInsertTokenPossibleAt(columnIndex)){ //checks if column is full
        for(let i=this.fields.length-1; i>=0; i--){
          if(this.isInsertTokenPossibleAtThisPlace(columnIndex, i)){
            if(this.playerMode==1){ //if player 1 plays then insert x on the right column as deep as possible
              this.fields[i][columnIndex]='x';
              if(this.isGameOver('x', columnIndex, i)){ //if there are four items of the same player next to each other
                this.gameOver=true;
                this.toString();
                setTimeout(function () {
                    $('.winner').text('Player 1 won the game.');//shows which player has won
                    $('.player').empty();
                },10);
                  break;
              }
              else
                  this.playerMode=2;

              break;
            }
            if(this.playerMode==2){ //same as player one
              this.fields[i][columnIndex]='o';
                if(this.isGameOver('o', columnIndex, i)){
                    this.gameOver=true;
                    this.toString();
                    setTimeout(function () {
                        $('.winner').text('Player 2 won the game.');
                        $('.player').empty();
                    },10);
                    break;
                }
                else
                    this.playerMode=1;
              break;
            }
          }
        }

      }
      else{
        alert('Column is full, please try another');
      }
    }

    isGameOver(playerIcon, columnIndex, rowIndex){ //checks if there are four items of the same player in a row or column
      console.log(columnIndex);
      console.log(rowIndex);
      let isFour=0;
      for(let i=rowIndex; i<this.fields.length; i++){ //checks if there are 4 in a row(downside)
        if(this.fields[i][columnIndex]==playerIcon){
          isFour++;
        }
        else break;
      }
      if(isFour>=4)
        return true;
      isFour=0;
      for(let j=rowIndex; j>=0; j--){ //checks if there are 4 in a row (upside)
            if(this.fields[j][columnIndex]==playerIcon){
                isFour++;
            }
            else break;
        }
      if(isFour>=4)
        return true;
      isFour=0;
      for(let k=columnIndex; k<this.fields[rowIndex].length; k++){ //checks if there are 4 in a column(to right)
          console.log('player hat: '+playerIcon);
          console.log('feld hat: '+this.fields[rowIndex][k]);
          console.log('row: '+rowIndex);
          console.log('i: '+k);
        if(this.fields[rowIndex][k-1]==playerIcon){
            isFour++;
        }
        else break;
      }
      if(isFour>=4)
        return true;
      isFour=0;

      for(let l=columnIndex; l>=0; l--){//checks if there are 4 in a column(to left)
            if(this.fields[rowIndex][l]==playerIcon){
                isFour++;
            }
            else break;
      }
      if(isFour>=4 || this.checkDiagonal(playerIcon))//if there are four same items next to each other
        return true;
      if(isFour<4 || !this.checkDiagonal(playerIcon)) return false;
    }

    checkDiagonal(playerIcon){ //checks, like isGameOver, if four items from the same player are in a diagonal
      let max_row = this.fields.length;

      if(max_row <= 0)//checks if the rows are more then zero
        return false;

      let max_height = this.fields[0].length;

      if(max_height <= 0) //checks if the columns are more then zero
        return false;

      for(let i = 0; i < max_row; ++i){ //run through the array and checks if the item is the same, as the one of the player
        for(let j = 0; j < max_height; ++j){
          if(this.fields[i][j] == playerIcon){
            let found = this.checkDiagonalRecursive(i, j, max_row, max_height, playerIcon, 1, 0) ||
                this.checkDiagonalRecursive(i, j, max_row, max_height, playerIcon, 2, 0) ||
                this.checkDiagonalRecursive(i, j, max_row, max_height, playerIcon, 3, 0) ||
                this.checkDiagonalRecursive(i, j, max_row, max_height, playerIcon, 4, 0);

            if(found) //checks every direction
              return true;
          }
        }
      }

      return false;
    }

    checkDiagonalRecursive(rowIndex, columnIndex, length, height, playerIcon, direction, counter){ //checks every diagonal direction, if there are four
      if(length <= 0 || height <= 0)//checks if length or height are not zero
        return false;

      if(columnIndex >= length || columnIndex < 0) //checks if column index has the right value
        return false;

      if(rowIndex >= length || rowIndex < 0) //check if the row index has the right value
          return false;


      if(this.fields[rowIndex][columnIndex] != playerIcon) //checks it the icon is the same as the player icon
        return false;
      else if(counter >= 3)//if the counter is 3 then there are 4 in a row and the game is won
        return true;

      counter++;

      switch(direction){ //takes the right direction
          case 1:
            rowIndex--;
            columnIndex--;
            break;
          case 2:
              rowIndex++;
              columnIndex--;
            break;
          case 3:
              rowIndex--;
              columnIndex++;
            break;
          case 4:
              rowIndex++;
              columnIndex++;
            break;
          default:
            return false;
            break;
      };
      return this.checkDiagonalRecursive(rowIndex, columnIndex, length, height, playerIcon, direction, counter);
    }

    isInsertTokenPossibleAtThisPlace(columnIndex, rowIndex){ //checks if the field is busy
      if(this.fields[rowIndex][columnIndex]==='-')
        return true;
      return false;
    }

    isInsertTokenPossibleAt(columnIndex) {//checks it the column is full
      if(this.fields[0][columnIndex] === '-')
              return true;
      return false;
    }

    toString() { //prints the array every time a player presses a key
      //console.log('toString works');
        $('#output').empty(); //output must be empty to append the current values
        $('<div class="winner"></div>').appendTo('#output');
        $('<div class="player"></div>').appendTo('#output');
      for(let i=0; i<this.fields.length; i++) //appends the array in the output div
        {

          let columns ='<div>';
          for(let j=0; j<this.fields[i].length; j++){
            columns+=" "+this.fields[i][j];
              //$('<div class="'+i+'">'+this.fields[i][j]+'</div>').insertBefore('.winner')
          }
            $(columns+'</div><br/>').insertBefore('.winner');
        }
        //console.log(this.playerMode);

        $('.player').text('Player '+this.playerMode);

    }
  }

  namespace.Model = Model;

})(window.connectFour, window);

