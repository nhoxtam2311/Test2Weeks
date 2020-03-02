const app = document.getElementById('caro');
let size = 0;
let winCondition = 0;
var caro;
let id;
let x = 0;
let y = 0;
let bool = true;
var caroTemp;

function start() {
    size = document.getElementById('size').value;
    winCondition = document.getElementById('winCondition').value;
    if(winCondition > size){
        alert("Try again!");
        reset();
    }
    if (winCondition <= 0) {
        alert("Try again!");
        reset();
    }
    createGrid(size);
    caro = checkClick(size);
    caroTemp = addTemp(size);
}

function reset(){
    location.reload();
}

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            let cell = document.createElement('div')
            cell.classList.add("cell");
            cell.id = `${i}-${j}`;
            cell.addEventListener("click", getID);
            row.appendChild(cell);
        }
        app.appendChild(row);
    }
}

function checkClick(size) {
    let caro = new Array(size);
    for (let i = 0; i < size; i++) {
        caro[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            caro[i][j] = 0;
        }
    }
    return caro;
}

function addTemp(size) {
    let caroTemp = new Array(size);
    for (let i = 0; i < size; i++) {
        caroTemp[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            caroTemp[i][j] = "";
        }
    }
    return caroTemp;
}

function getID(e) {
    id = e.target.id;
    x = parseInt(id[0]);
    y = parseInt(id[2]);
}

function addMove() {
    if (bool === true && caro[x][y] === 0) {
        document.getElementById(`${id}`).innerHTML = "X";
        caroTemp[x][y] === "" ? caroTemp[x][y] = true: "";
        checkWin(x,y);
        bool = false;
        caro[x][y] = 1;
    }
    else if (bool === false && caro[x][y] === 0) {
        document.getElementById(`${id}`).innerHTML = "O";
        caroTemp[x][y] === "" ? caroTemp[x][y] = false: ""
        checkWin();
        bool = true;
        caro[x][y] = 1;
    }
}

function checkRow() {
    for (let i = 0; i < size; i++) {
        if (checkArr(caroTemp[i], bool) >= winCondition) {
            bool === TextTrackCue ? alert("Congrats! X is the winner!") : alert("Congrats! O is the winner!")
        }
    }
}

function checkCol() {
    let newcaro = addTemp(size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newcaro[i][j] = caroTemp[j][i];
        }
    }
    for (let i = 0; i < size; i++) {
        if (checkArr(newcaro[i], bool) >= winCondition) {
            bool === true ? alert("Congrats! X is the winner!") : alert("Congrats! O is the winner!") 
        }
    }
}

function checkWin(x,y){
    checkCol();
    checkRow();
    checkRightHandDiagonal(x, y);
    checkLeftHandDiagonal(x, y);
}

function checkArr(arr, bool) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i] === bool ? max ++ : "";
    }
    return max;
}

function checkLeftHandDiagonal(x, y) {
    let arr = [];
    let j = y;
    for (let i = x; i < caroTemp.length; i++) {
        arr.push(caroTemp[i][j++]);
    }    
    j = y;
    for (let i = x; i >= 0; i--) {
        i !== x ? arr.unshift(caroTemp[i][--j]) : "";
    }    
    arr = arr.filter(val => val !== undefined);
    if (checkArr(arr, bool) >= winCondition) {
        bool ? alert("Congrats! X is the winner!") : alert("Congrats! O is the winner!")
        
    }
}

function checkRightHandDiagonal(x, y) {
    let arr = [];
    let j = y;
    for (let i = x; i >= 0; i--) {
        arr.push(caroTemp[i][j++]);
    }
    arr = arr.filter(val => val !== undefined);
    j = y;
    for (let i = x; i < size; i++) {
        i !== x ? arr.unshift(caroTemp[i][--j]) : "";
        
    }
    arr = arr.filter(val => val !== undefined);
    if (checkArr(arr, bool) >= winCondition) {
        bool ? alert("Congrats! X is the winner!") : alert("Congrats! O is the winner!")
        
    }
    console.log(arr);
}

function click() {
    size !== 0 ? document.addEventListener("click", addMove): "";
    
}
document.addEventListener("click", click);