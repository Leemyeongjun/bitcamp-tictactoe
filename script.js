const box = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
 win_table = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let table_option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let running = false;

initializeGame();

function initializeGame() {
    box.forEach(box => box.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}의 차례`;
    running = true;
}
function cellClicked() {
    const boxIndex = this.getAttribute("boxIndex");

    if(table_option[boxIndex] != "" || !running){
        return;
    }

    updateCell(this, boxIndex);
    checkWinner();
}
function updateCell(box, index) {
    table_option[index] = currentPlayer;
    box.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == "O") ? "X" : "O";
    statusText.textContent = `${currentPlayer}의 차례`;
}
function checkWinner() {
    let win = false;

    for(let i = 0; i < win_table.length; i++){
        const table = win_table[i];
        const boxA = table_option[table[0]];
        const boxB = table_option[table[1]];
        const boxC = table_option[table[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            win = true;
            break;
        }
    }

    if(win) {
        statusText.textContent = `${currentPlayer} 승리!`;
        running = false;
    }
    else if(!table_option.includes("")){
        statusText.textContent = '무승부';
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = "O";
    table_option = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}의 차례`;
    box.forEach(box => box.textContent = "");
    running = true;
}