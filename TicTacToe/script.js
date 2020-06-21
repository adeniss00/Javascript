let origBoard;

const huPlayer='O';
const aiPlayer='X';

const winCombos=[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,2]];

const cells=document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector('.endgame').style.display='none';
	origBoard=Array.from(Array(9).keys());
	for(var i=0;i<cells.length;i++){
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',turnClick,false);

	}
}

function turnClick(square){
	if (typeof origBoard[square.target.id] =='number') {

	turn(square.target.id,huPlayer);
	if (!checkTie()) {
		turn(bestSpot(),aiPlayer);
	}
	}
}


function turn (squareId,player) {
	origBoard[squareId]=player;
	document.getElementById(squareId).innerText=player;
	let gameWon=checkWin(origBoard,player);
	if(gameWon){
		gameOver(gameWon);
	}
}

function checkWin (board,player) {
	 let plays=board.reduce((a,e,i)=>
	 	(e===player)  ? a.concat(i) : a,[]);
	let gameWon=null; 
	for (let [index,win] of winCombos.entries()) {
		if (win.every(elem=> plays.indexOf(elem)>-1)) {
			gameWon={index:index,player:player};
			break; 
		}
	}
	return gameWon;
}
function gameOver (gameWon) {
	for (index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor=gameWon.player == huPlayer ? "blue" : "red";
	}
	for(var j = 0;j <cells.length; j++){
		cells[j].removeEventListener('click',turnClick,false);
	}
	declareWinner(gameWon.player==huPlayer? "You win " : "You lose");
}

function declareWinner (who) {
	document.querySelector('.endgame').style.display = 'block';
	document.querySelector('.endgame .text').innerText =who;
}

function emptySquares()  {
	return origBoard.filter(s=> typeof s =='number');
}

function bestSpot () {
	return  minimax(origBoard,aiPlayer).index;
}

function checkTie () {
	if(emptySquares().length==0){
		for(var j = 0, length2 = cells.length; j < length2; j++){
			cells[j].style.backgroundColor = 'green';
			cells[j].removeEventListener('click',turnClick,false);
		}
		declareWinner("Tie Game !");
		return true; 
	}
	return false; 
}

function minimax (newBoard,player) {
	let availSpots=emptySquares(newBoard);
	if(checkWin(newBoard,player)){
		return {score: -10};
	}
	else if(checkWin(newBoard,aiPlayer)){
		return {score: 10};
	}
	else if(availSpots.length===0){
		return {score: 0};
	}
	let moves=[];
	for(var j = 0, length2 = availSpots.length; j < length2; j++){
		let move={}; 
		move.index=newBoard[availSpots[j]];
		newBoard[availSpots[j]]=player;
		if (player==aiPlayer) {
			let result=minimax(newBoard,huPlayer);
			move.score=result.score; 
		}
		else{
			let result=minimax(newBoard,aiPlayer);
			move.score=result.score; 
		}
		newBoard[availSpots[j]]=move.index; 
		moves.push(move);
		var bestMove; 
		if (player===aiPlayer) {
			let bestScore=-10000; 
			for(var j = 0, length2 = moves.length; j < length2; j++){
				if(moves[j].score>bestScore){
					bestScore=moves[j].score; 
					bestMove=j; 
				}
			}
		} 
		else{
			let bestScore=-10000; 
			for(var j = 0, length2 = moves.length; j < length2; j++){
				if(moves[j].score>bestScore){
					bestScore=moves[j].score; 
					bestMove=j; 
				}
			}
		}	
	}
	return moves[bestMove];
}