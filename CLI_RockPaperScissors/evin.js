var prompt = require('prompt');
var player1Score = 0;
var player2Score = 0;

//Starts the prompting library.
prompt.start();

//Begins the function that runs the program, starting the game.
startGame();

//Start game function. Starts by telling player 1 to choose a weapon, then moves on to get their input.
function startGame(){

	console.log("Player 1, choose your weapon!");
	getPlayer1();
}

//Gets player 1's input. Checks the validity of their answer. If the answer is valid, moves on to player 2. If not, tells them their options and restarts the function.
function getPlayer1(){

	prompt.get(['P1Weapon'], function (err, result) {
		
		var lowerP1Weapon = result.P1Weapon.toLowerCase();
		var isAnswerValid = checkValidity(lowerP1Weapon);
		if (isAnswerValid == true){
			console.log('Player 1, you chose ' + result.P1Weapon + '.');
			console.log("Player 2, choose your weapon!");
			prompt.get(['P2Weapon'], function (err, result) {
			var lowerP2Weapon = result.P2Weapon.toLowerCase();
			var isAnswerValid = checkValidity(lowerP2Weapon);
			if (isAnswerValid == true){
				console.log('Player 2, you chose ' + result.P2Weapon + '.');
				whoWon(lowerP1Weapon, lowerP2Weapon);
			}
			});
		}
	});
}

//Function which looks at the choices the players made and determines a winner. If they chose the same, they tied!
function whoWon(p1weapon, p2weapon){

	if (p1weapon == p2weapon){
		var winnerResult = "It's a tie!"
		console.log(winnerResult);
		console.log('The score is currently ' + player1Score + ' to ' + player2Score + '.');
		startGame();
		return winnerResult;
	}	
	if ((p1weapon == "rock" && p2weapon == "scissors") || (p1weapon == "scissors" && p2weapon == "paper") || (p1weapon == "paper" && p2weapon == "rock")){
		var winnerResult = "Player 1 wins!!!"
		console.log(winnerResult);
		addScore(winnerResult);
		return winnerResult;
	}
	if ((p2weapon == "rock" && p1weapon == "scissors") || (p2weapon == "scissors" && p1weapon == "paper") || (p2weapon == "paper" && p1weapon == "rock")){
		var winnerResult = "Player 2 wins!!!"
		console.log(winnerResult);
		addScore(winnerResult);
		return winnerResult;
	}
}

//Checks the validity of the players' answers. If they didn't type in rock, paper, or scissors, returns an invalid answer.
function checkValidity(weapon){
	lowerWeapon = weapon.toLowerCase();

	if (lowerWeapon == "rock" || lowerWeapon == "paper" || lowerWeapon == "scissors"){
		return true;
	}
	else {
		return false;
	}
}

function addScore(winResult){

	if (winResult == "Player 1 wins!!!"){
		player1Score = player1Score + 1;
		keepScore();
		return player1Score;

	}

	if (winResult == "Player 2 wins!!!"){
		player2Score = player2Score + 1;
		keepScore();
		return player2Score;
	}
}

function keepScore(){

	if (player1Score < 5 && player2Score < 5){
		console.log('The score is currently ' + player1Score + ' to ' + player2Score + '.');
		startGame();
	}

	if (player1Score == 5 && player2Score < 5){
		console.log('Player 1 won, with a score of 5 to ' + player2Score + '!');
	}

	if (player1Score < 5 && player2Score == 5){
		console.log('Player 2 won, with a score of 5 to ' + player1Score + '!');
	}
}

function snarkyResponses(weapon){
	console.log("Your options are rock, paper, or scissors. Try again slugger.");
}

