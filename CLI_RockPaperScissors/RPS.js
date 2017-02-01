var functions = require('./functions');

var score = [0,0];

	var prompt = require('prompt');
	prompt.start();
var i = 0
while (i<3){
	score = playRound(score)
	i += 1
}


function playRound(score){
	prompt.get(['P1'], function (err, result) {
		p1_weapon = result.P1.toLowerCase()

		if (p1_weapon == "rock" || p1_weapon == "paper" || p1_weapon == "scissors"){
			prompt.get(['P2'], function (err, result) {
				p2_weapon = result.P2.toLowerCase()
				if (p2_weapon == "paper"|| p2_weapon == "paper" || p2_weapon == "scissors"){
					result = functions.determineWinnerFunction(p1_weapon,p2_weapon)
					score = functions.updateScoreFunction(score, result)
					console.log(result)
					console.log("Current score:\n Player 1: " + score[0] + " Player 2: " + score[1])
				}
				else{console.log("Player 2 please enter rock, paper, or scissors")}
			});
		}
		else{console.log("Player 1 please enter rock, paper, or scissors")}
	});
	return score
}


