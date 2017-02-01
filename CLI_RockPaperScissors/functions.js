

function determineWinner(p1_weapon, p2_weapon){
	var text = ""
	if (p1_weapon == "rock"){
		if (p2_weapon == "paper"){text = "P2 wins!"}
		else if (p2_weapon == "scissors"){text = "P1 wins!"}
		else if (p2_weapon == "rock"){text = "Tie!"}
	}
	else if (p1_weapon == "paper"){
		if (p2_weapon == "scissors"){text = "P2 wins!"}
		else if (p2_weapon == "rock"){text = "P1 wins!"}
		else if (p2_weapon == "paper"){text = "Tie!"}
	}

	else if (p1_weapon == "scissors"){
		if (p2_weapon == "rock"){text = "P2 wins!"}
		else if (p2_weapon == "paper"){text = "P1 wins!"}
		else if (p2_weapon == "scissors"){text = "Tie!"}
	}
	else {text = "P1 must choose Rock, Paper or Scissors" + text}
	return text
}
function updateScore(score, result){
	if (result == "P1 wins!"){
		score["Player 1"] += 1
	}
	else if (result == "P2 wins!"){
		score["Player 2"] += 1
	}
	console.log(result)
	console.log("Current score:\n Player 1: " + score["Player 1"] + " Player 2: " + score["Player 2"])
	return score
}


module.exports = {
	determineWinnerFunction:determineWinner,
	updateScoreFunction:updateScore
}