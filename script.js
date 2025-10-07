//your JS code here. If required.
const gameBoard=document.querySelector(".game-board");
const form=document.querySelector(".form");
const playerInfo=document.querySelector(".message");
let isGameOver=false;
const WinningCombinations=[
	//Rows
	["1","2","3"],
	["4","5","6"],
	["7","8","9"],
	
	//Columns
	["1","4","7"],
	["2","5","8"],
	["3","6","9"],

	//Diagonals
	["1","5","9"],
	["3","5","7"]
]
const playerOneChoices=[];
const playerTwoChoices=[];
function createGridItems(){
	for(let i=1;i<=9;i++){
		let div=document.createElement("div");
		div.className="grid-items";
		div.id=`${i}`;
		gameBoard.appendChild(div);
	}
}
createGridItems();

form.addEventListener("submit",(e)=>{
	e.preventDefault();
	localStorage.setItem("player1",e.target[0].value);
	localStorage.setItem("player2",e.target[1].value);
	e.target.classList.add("hide");
	gameBoard.classList.remove("hide");
	playerInfo.innerText=`${localStorage.getItem("player1")}, you're up `;
	e.target.reset();
})
const boxes=document.querySelectorAll(".grid-items");
let choosePlayer=0;
boxes.forEach((box)=>{
	box.addEventListener("click",(e)=>{
		if(e.target.innerText=="" && !isGameOver){
			
		if(choosePlayer%2==0){
			box.innerText="X";
			playerOneChoices.push(e.target.id);
			playerInfo.innerText=`${localStorage.getItem("player2")}, you are up`
		}else{
			box.innerText="O";
			playerTwoChoices.push(e.target.id);		
			playerInfo.innerText=`${localStorage.getItem("player1")}, you are up`
		} 
		choosePlayer+=1;
			
		if(playerOneChoices.length>=3){
			if(isPlayerWon(playerOneChoices)){
				playerInfo.innerText=`${localStorage.getItem("player1")} congratulations you won!`
				isGameOver=true;
				return;
			}
			
		}
		if(playerTwoChoices.length>=3){
			if(isPlayerWon(playerTwoChoices)){
				playerInfo.innerText=`${localStorage.getItem("player2")} congratulations you won!`
				isGameOver=true;
				return;
			}
		}
		if(choosePlayer==9){
			playerInfo.innerText="Game Tied";
			return;
		}
			
		}

	})
	
})

function isPlayerWon(playerChoices){
    console.log(playerChoices);
	for(let combo of WinningCombinations){
		let isWinningCombo=true;
		for(let j=0;j<combo.length;j++){
			if(!playerChoices.includes(combo[j])){
				isWinningCombo=false;
				break;
			}
		}
		if(isWinningCombo){
			return isWinningCombo;
		}
	}
	return false;
}