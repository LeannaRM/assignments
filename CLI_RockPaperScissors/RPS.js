var functions = require('./functions');

var score = {"Player 1": 0,"Player 2": 0};

var prompt = require('prompt');
prompt.start();

playRound();

function playRound(){
	prompt.get(['P1'], function (err, result) {
		p1_weapon = result.P1.toLowerCase()

		if (p1_weapon == "rock" || p1_weapon == "paper" || p1_weapon == "scissors"){
			prompt.get(['P2'], function (err, result) {
				p2_weapon = result.P2.toLowerCase()
				if (p2_weapon == "paper"|| p2_weapon == "rock" || p2_weapon == "scissors"){
					result = functions.determineWinnerFunction(p1_weapon,p2_weapon)
					score = functions.updateScoreFunction(score, result)
					startorend(score)
				}
				else{
					console.log("Player 2 please enter rock, paper, or scissors. Replay round.")
					playRound()
				}
			});
		}
		else{
			console.log("Player 1 please enter rock, paper, or scissors. Replay round.")
			playRound()
		}
	});
	return score
}


function startorend(score){
	if (score["Player 1"]<3 && score["Player 2"]<3){
		playRound()
	}
	else {
		if (score["Player 1"] = 3){console.log("Player 1 wins best of 5 series!")}
		else{console.log("Player 2 wins best of 5 series!")}
		console.log("Game score:\n Player 1: "+ score["Player 1"] + " Player 2: " + score["Player 2"])
	}
	return
}


