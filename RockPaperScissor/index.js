let userScore=0;
let computerScore=0;
const userScore_span=document.getElementById("user-score");
const computerScore_span=document.getElementById("computer-score");
const scoreBoard_div=document.querySelector(".score-board");
const result_div=document.getElementById(".result");
const result_p=document.querySelector(".result>p");
const rock_div=document.getElementById("r");
const paper_div=document.getElementById("p");
const scissors_div=document.getElementById("s");

const getCompChoice = () => {
    const roll = ['r', 'p', 's'];
    const random = Math.floor(Math.random() * 3);
    return roll[random];
}
function convertToWord (letter) {
    if (letter === 'r') {
    	return 'Rock';
    }
    if (letter === 'p') {
     return 'Paper';
    }
    if (letter === 's') {
    	return 'Scissor';
    }
}

function win(userChoice,compChoice){
  userScore++
  userScore_span.innerHTML=userScore;
  computerScore_span.innerHTML=computerScore;
  console.log(compChoice);
  result_p.innerHTML=convertToWord(userChoice)+" user "+" beats "+convertToWord(compChoice)+" computer "+". You win!";
  document.getElementById(userChoice).classList.add('green-glow');
  setTimeout(()=>document.getElementById(userChoice).classList.remove('green-glow'),300);
}

function lose(userChoice,compChoice){
  computerScore++;
  userScore_span.innerHTML=userScore;
  computerScore_span.innerHTML=computerScore;
  result_p.innerHTML=convertToWord(userChoice)+" user "+" loses "+convertToWord(compChoice)+" computer "+". You lose!";
 	  document.getElementById(userChoice).classList.add('red-glow');
  setTimeout(()=>document.getElementById(userChoice).classList.remove('red-glow'),300);
}
function draw(userChoice,compChoice){
	result_p.innerHTML=convertToWord(userChoice)+" user "+" equals to  "+convertToWord(compChoice)+" computer "+". Its a draw";
	  document.getElementById(userChoice).classList.add('gray-glow');
  setTimeout(()=>document.getElementById(userChoice).classList.remove('gray-glow'),300);
}
function game(userChoice){
	const compChoice = getCompChoice();
    switch (userChoice + compChoice) {
        case "rs":
        case "pr":
        case "sp":
        win(userChoice, compChoice);
        break;

        case "rp":
        case "ps":
        case "sr":
        lose(userChoice, compChoice);
        break;

        case "rr":
        case "pp":
        case "ss":
        draw(userChoice, compChoice);
        break;
    }
}

function  main(){
    rock_div.addEventListener('click', () => {
        game('r');
    });
    
    paper_div.addEventListener('click', () => {
        game('p');
    });
    
    scissors_div.addEventListener('click', () => {
        game('s');
    });
}
main();