// Variables
const playerX = "X"
const playerO = "O"
let currentPlayer = playerX;
let gameOver = false;

const winningMessage = document.querySelector('[data-winning-message-text]');
const winningMessageFeature = document.getElementById('winningMessage');
const restart = document.getElementById('restartButton')
restart.addEventListener('click', setGame);

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function showNames(e){
    var firstName= document.getElementById("p1name").value;
    var secondName = document.getElementById("p2name").value;
    document.getElementById("show").innerText = "Player 1:" + " " + firstName + ", " + "Player 2:" + " " + secondName;   
  }

window.onload = function() {
    setGame();
}

function setGame() {
    const tiles = document.getElementsByClassName('tile');
    for (i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML=""
        tiles[i].addEventListener('click', setTile)
    }
    //Randomly select who goes first
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-")
    let r = parseInt(coords[1]);
    let c = parseInt(coords[2]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currentPlayer;
    this.innerText = currentPlayer;

    if (currentPlayer == playerX) {
        currentPlayer = playerO
    }
    else {
        currentPlayer = playerX;
    }

    checkWinner();
}


// [0, 1, 2],
// [3, 4, 5],
// [6, 7, 8],
// [0, 3, 6],
// [1, 4, 7],
// [2, 5, 8],
// [0, 4, 8],
// [2, 4, 6]

function checkWinner() {

    for (i = 0; i < winCondition.length; i++) {
            const conditon = winCondition[i];

        for (j = 0; j < conditon.length; j++) {
            console.log(conditon)
            const index = conditon[j];
            const tiles = document.getElementsByClassName('tile');
            console.log(tiles)
            for (t = 0; t < tiles.length; t++) {
                console.log(tiles[t])
                
            }
        }
    }

}

function stopGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw :/'
    } else {
        winningMessage.innerText = `${playerX ? "X's" : "O's"} Win :)`
    }
    winningMessageFeature.classList.add('show')
}