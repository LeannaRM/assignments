require_relative "./functions.rb"


#Set initial score to zero
score = {"Player 1"=> 0,"Player 2"=> 0};

#Play rounds until one player reaches 3 points
while score["Player 1"]<3 && score["Player 2"]<3
	playRound(score)
end