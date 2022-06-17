// Variables
let state = {
    currentPlayer: 'X',
    players: [],
    turnCount: Number(0)
}
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

window.onload = function() {
    setGame();
}

const restart = document.getElementById('restartButton')
restart.addEventListener('click', resetGame);

function setGame() {
    document.getElementById('currentPlayer').innerHTML=`Current Player: ${state.currentPlayer}`
    const tiles = document.getElementsByClassName('tile');
    for (i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML=""
        tiles[i].addEventListener('click', alertStart)
    }
}

function alertStart() {
    alert('You must start the game before playing.') 
}

function selectRandomPlayer() {
    let randomNumber = Math.floor(Math.random() * 10)
    if (randomNumber >= Number(5)){
        state.currentPlayer='O';
    }
    else {
        state.currentPlayer='X';
    }
}

function resetGame() {
    document.getElementById("p1name").value='';
    document.getElementById("p2name").value='';
    document.getElementById("show").innerText = '';
    state.turnCount = Number(0);
    state.players = [];
    
    const tiles = document.getElementsByClassName('tile');
    for (i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML=""
        tiles[i].addEventListener('click', setTile)
    }
    //Randomly select who goes first
    selectRandomPlayer();
    document.getElementById('currentPlayer').innerHTML=`Current Player: ${state.currentPlayer}`
}


function startGame() {
    var player1Name= document.getElementById("p1name").value;
    var player2Name = document.getElementById("p2name").value;

    const player1 = {
        Player: {
            name: player1Name,
            symbol: 'X',
            tiles: []
        }
    };
    const player2 = {
        Player: {
            name: player2Name,
            symbol: 'O',
            tiles: []
        }
    };
    state.players.push(player1);
    state.players.push(player2);
    
    document.getElementById("show").innerText = "Player 1: "+ state.players[0].Player.name + ", Player 2: " + state.players[1].Player.name;
    
    const tiles = document.getElementsByClassName('tile');
    for (i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML=""
        tiles[i].removeEventListener('click', alertStart)
        tiles[i].addEventListener('click', setTile)
    }
    selectRandomPlayer();
    document.getElementById('currentPlayer').innerHTML=`Current Player: ${state.currentPlayer}`
}

function setTile() {
    let currentPlayer = getCurrentPlayer();
    // if the selected tile is not already slected
    if (this.innerHTML=="" || this.innerHTML==null) {
        // Update the UI to show the current player's symbol
        this.innerHTML=currentPlayer.symbol
        // Add Id of selected tile to the current player's tile array
        addSelectedTile(this.id);
        // Check the winCondition everytime the tile array is updated
        checkWinner(currentPlayer.tiles);
        // change to the next player's turn
        changeTurns();
    } else {
        window.alert("Don't do that.")
    }
}

// Get the Current Player's object
function getCurrentPlayer() {
    let currentPlayer;
    if (state.currentPlayer === state.players[0].Player.symbol) {
        currentPlayer = state.players[0].Player
    } else {
        currentPlayer = state.players[1].Player
    }
    return currentPlayer
}

// Add Id of selected tile to the current player's tile array
function addSelectedTile(id) {
    if (state.currentPlayer === state.players[0].Player.symbol) {
        state.players[0].Player.tiles.push(Number(id));
    }
    else {
        state.players[1].Player.tiles.push(Number(id));
    }
}

// change to the next player's turn
function changeTurns() {
    const currentPlayerHeader = document.getElementById('currentPlayer');
    if (state.currentPlayer == 'X') {
        state.currentPlayer = 'O'
        currentPlayerHeader.innerHTML=`Current Player: ${state.currentPlayer}`
    }
    else {
        state.currentPlayer = 'X'
        currentPlayerHeader.innerHTML=`Current Player: ${state.currentPlayer}`
    }
}

function checkWinner(tilesArray) {
    // check and increment turn count
    if (tilesArray.length >= 3){
        for (let winConditionIndex = 0; winConditionIndex<winConditions.length; winConditionIndex++) {
            let matchCount = 0;
            for (let conditionIndex = 0; conditionIndex<winConditions[winConditionIndex].length; conditionIndex++) {
                const isInTilesArray = tilesArray.includes(winConditions[winConditionIndex][conditionIndex])
                if (isInTilesArray) matchCount +=1
                if (matchCount>=3) {
                    alert(`Player ${state.currentPlayer}, You won!`);
                    endGame();
                }
            }
        }
    }
    state.turnCount += 1;
    if (state.turnCount === 9) {
        alert('Its a draw! 🤠');
        endGame();
    }
}

function endGame() {
    const tiles = document.getElementsByClassName('tile');
    for (i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener('click', setTile)
    }
}