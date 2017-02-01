
#This functions takes two weapons and determines a winner. 
#The output is a text string that can be interpreted by the updatescore function.
#Additionally, output of this function will be displayed on screen.
def determineWinner(p1_weapon, p2_weapon)
	text = ""
	if p1_weapon == "rock"
		if p2_weapon == "paper" then text = "P2 wins!"
		elsif p2_weapon == "scissors" then text = "P1 wins!"
		elsif p2_weapon == "rock" then text = "Tie!" 
		else text = "Player 2 must choose rock, paper, or scissors. Replay round." end
	elsif p1_weapon == "paper"
		if p2_weapon == "scissors" then text = "P2 wins!"
		elsif p2_weapon == "rock" then text = "P1 wins!"
		elsif p2_weapon == "paper" then text = "Tie!"
		else text = "Player 2 must choose rock, paper, or scissors. Replay round." end
	elsif p1_weapon == "scissors"
		if p2_weapon == "rock" then text = "P2 wins!"
		elsif p2_weapon == "paper" then text = "P1 wins!"
		elsif p2_weapon == "scissors" then text = "Tie!"
		else text = "Player 2 must choose rock, paper, or scissors. Replay round." end
	else 
		text = "P1 must choose Rock, Paper or Scissors."
		unless p2_weapon == "rock" || p2_weapon == "paper" || p2_weapon == "scissors"
			text = text + "\nPlayer 2 must choose rock, paper, or scissors. Replay round."
		end
	end
	return text
end

# Scores of the two players are updated and the current score after the update is displayed.
def updateScore(score, result)
	if result == "P1 wins!"
		score["Player 1"] += 1
	elsif result == "P2 wins!"
		score["Player 2"] += 1
	end
	puts result
	puts "Current score:\n Player 1: " + score["Player 1"].to_s + "    Player 2: " + score["Player 2"].to_s + "\n\n"
	return score
end


# This is the main function that initially gets user input and then runs the two functions above.
# Two players must enter weapons.
# This does one round of getting payer input, determining the winner and updating the score.
def playRound(score)
	puts "Player 1 enter your weapon: "
	p1 = gets.chomp.downcase
	puts "Player 2 enter your weapon: "
	p2 = gets.chomp.downcase
	result = determineWinner(p1, p2)
	updateScore(score,result)
end