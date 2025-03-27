


document.addEventListener('DOMContentLoaded', () => {
    const boards =  document.querySelectorAll('.boards')
   const gameMsg = document.getElementById('game-message')
   const resetButton =  document.getElementById('reset-btn')
   const namesDialog = document.querySelector('.names-dialog');
   const namesDialogButton = namesDialog.querySelector('button[type="submit"]');
   const resultDialog = document.querySelector('.result-dialog');
   const winnerMessage = document.getElementById('winner-message');


   let gameBoard = [ "" , "" , "" , "" , "" , "", "", "", ""]
   let currentPlayer = 'X';
   let isGameActive = false;
   let players = { X: 'Player X', O: 'Player O'}

   namesDialog.showModal();


   namesDialogButton.addEventListener('click', (e) => {
     e.preventDefault()
     const player1 = document.getElementById('name1').value || "Player X";
     const player2 = document.getElementById('name2').value || "Player O";
     players = { X: player1, O: player2};

     namesDialog.close();
     isGameActive = true;
     gameMsg.textContent = `${players[currentPlayer]}'s Turn`;
   })




   const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];


    for(let patterns of winPatterns) {
        const [a, b, c] = patterns;
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive  = false;
            winnerMessage.textContent = `${players[currentPlayer]} Wins!`;
            resultDialog.showModal();
            return;
        }
    }


    if(!gameBoard.includes("")) {
        isGameActive = false;
        winnerMessage.textContent = "It's a Tie!";
        resultDialog.showModal();
    }

   }




   const boardClick = (event) => {
        const index = event.target.dataset.index;
        if(!isGameActive || gameBoard[index] !== "") {
            return;
        }
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner()

        if(isGameActive){
            currentPlayer = currentPlayer === 'X'? "O" : "X"
            gameMsg.textContent = `${players[currentPlayer]}'s Turn`;
        }
 
   }


    
   const resetGame = () => {
    gameBoard.fill("");
    currentPlayer = 'X';
    isGameActive = true;
    gameMsg.textContent = `${players[currentPlayer]}'s Turn`;
    boards.forEach((e => e.textContent = "" ))
   }



   const mobileTouchEvent = (event) => {
     event.preventDefault()
     boardClick(event)
   }


   boards.forEach(e => {
    e.addEventListener('click', boardClick)
    e.addEventListener('touchstart', mobileTouchEvent, { passive: false })
   }) 


   resetButton.addEventListener('click', resetGame);
   window.closeDialog = () => resultDialog.close();
})