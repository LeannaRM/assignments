

function determineWinner(p1_weapon, p2_weapon){
	var text = ""
	if (p1_weapon == "rock"){
		if (p2_weapon == "paper"){text = "P2 wins!"}
		else if (p2_weapon == "scissors"){text = "P1 wins!"}
		else if (p2_weapon == "rock"){text = "Tie!"}
		else{text = "P2 must choose Rock, Paper or Scissors"}
	}
	else if (p1_weapon == "paper"){
		if (p2_weapon == "scissors"){text = "P2 wins!"}
		else if (p2_weapon == "rock"){text = "P1 wins!"}
		else if (p2_weapon == "paper"){text = "Tie!"}
		else{text = "P2 must choose Rock, Paper or Scissors"}
	}

	else if (p1_weapon == "scissors"){
		if (p2_weapon == "rock"){text = "P2 wins!"}
		else if (p2_weapon == "paper"){text = "P1 wins!"}
		else if (p2_weapon == "scissors"){text = "Tie!"}
		else{text = "P2 must choose Rock, Paper or Scissors"}
	}
	else {text = "P1 must choose Rock, Paper or Scissors" + text}
	return text
}


module.exports = {determineWinnerFunction:determineWinner}