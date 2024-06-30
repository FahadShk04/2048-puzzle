var board;
var score=0;
var rows=4;
var columns=4;

window.onload = function() {  //when page loads this function get callss.
    setGame(); //to setup the game this function get calls.
}

function setGame() {
    // board=[
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns ; c++) {
        //Each cell k liye div element create karta hai jismai uss cell ka number display hota h <div id = "0-0"></div> 
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();  //set coordinates correspond to your board(doubt) 13:36
            let num =  board[r][c];
            updateTile(tile , num); //this function call when we have to update the tile using sliding
            document.getElementById("board").append(tile);  // html document m kisi element ka id h "board" hai to usme ek aur element 
            //hai "tile" usko add kardo isse apne aap dynamic tareeke se element add kar sakte h
        }
    }
    //create random 2 tiles to begin the game
     setTwo();
     setTwo();
}


function updateTile(tile, num) {  //yeh pura function nahi samjha h  bss itna mlm hai yeh function update karta h numbers or style classs ko apne hmtl mai.
    tile.innerText = "";  //tile k number ko empty rakhta hai.
    tile.classList.value = ""; //clear the class list "tile x2 x4 x8" yeh sabh m se agar koi class h toh yeh usko remove kardega.
    tile.classList.add("tile"); // yeh tile class ko add karta hai tile element m tile class usually styling k liye hoti h.
    if (num > 0) {  //agar 0 se bada h toh innerText ko update karega.
        tile.innerText = num; //agar num 0 se bada h toh tile pe display hoygaaa.
        if (num <= 4096) {  //agar num 4096 se bada ya equal h toh x ki value uske hisaab se set hota h.
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
     }
   }
}

//logic for sliding numbers
document.addEventListener('keyup', (e) => {  //keyup mtlb ek baar click karege toh woh move on hojana chahiye for eg understand difference llllllllllll and l
      if(e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
      } 
      else if(e.code == "ArrowRight") {
        slideRight();
        setTwo();
      }
      else if(e.code == "ArrowUp") {
        slideUp();
        setTwo();
      }
      else if(e.code == "ArrowDown") {
        slideDown();
        setTwo();
      }
      document.getElementById("score").innerText = score; //score update karta h. 
})

function filterZero(row) {
     return row.filter(num => num !=0); //create a new array without 0
}

function slide(row){
    //[0,2,2,2]
    row = filterZero(row); // get rid of 0->[2,2,2]

    //slide
    for(let i = 0; i < row.length-1; i++){ //yeh loop shuru hota h or row k element ko check karta h but ignores the last one q ki -1 kiye h.
        //check every 2
        if(row[i] == row[i+1]) { //check karta h current row or uske baad wali value equal h.
            row[i] *= 2; //if yes then merge karta h.
            row[i+1] = 0; //or woh dusre element ki jaga ko 0 kardeta h.
            score += row[i]; //score ko badata h.
        } // [2,2,2] => [4,0,2]
    }

    row = filterZero(row); //[4,2]

    //add zeroes
    while (row.length < columns) {  //agar leng row ki column se choti h toh 0s add karke equal kardeta h.
        row.push(0);
    } //[4,2,0,0]

    return row;
}



function slideLeft(){  //function decl
    for(let r = 0; r < rows; r++){ //loops for rows.
        let row = board[r]; //row ki value set karta haii row k indices k according for eg 0 hai toh 1 row 2,2,2,2 wali.
        row = slide(row); //slide function ko call karte h current row k liye joh usko left side m kardeta h.
        board[r] = row; //update honeke baad usko set karta h board m.

        for(let c = 0; c < columns; c++){   //loops for cols
            let tile = document.getElementById(r.toString() + "-" + c.toString()); //game m 4x4 ka baord hai or har ek tile ka unique identity h eg row 2 or col 3 ki id kya aaygi simple 2-3.
            let num = board[r][c];// num var k andar apun current tile ko store krte h.
            updateTile(tile, num);//isse apun current tile ko call karte hai, jismai inner cell or current innertext update hota h.
        }
    }
}

function slideRight(){  //it basically do clear the zeros and add the numbers for eg [2,2,2,0] 1.clear the 0s [2,2,2] then merge [4,0,2] in this we add first 2s and we get 4 at second place we get 0 
    for(let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){  //it basically do clear the zeros and add the numbers for eg [2,2,2,0] 1.clear the 0s [2,2,2] then merge [4,0,2] in this we add first 2s and we get 4 at second place we get 0 
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r]; //upar wale k jagah isko likha hu
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){  //it basically do clear the zeros and add the numbers for eg [2,2,2,0] 1.clear the 0s [2,2,2] then merge [4,0,2] in this we add first 2s and we get 4 at second place we get 0 
    for(let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r]; //upar wale k jagah isko likha hu
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {  // randomly 2s generate karnaaa.
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while(!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if(board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText= "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() { //khali tile hai board m check karnaaa.
    let count = 0;
    for (let r = 0; r < rows ; r++) {
        for (let c = 0; c < columns; c++) {
            if(board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}