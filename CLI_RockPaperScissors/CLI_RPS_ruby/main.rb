require "sinatra"
require_relative "./functions.rb"
require 'pry'
enable :sessions


get('/'){
	erb :start
}

get('/startgame'){
	session[:playernames]=[params["player1name"],params["player2name"]]
	@names = session[:playernames]
	session[:score] = {"Player 1"=> 0,"Player 2"=> 0}
	@score = session[:score]
	@player = 0
	erb :game
}

get('/newround'){
	@score = session[:score]
	@names = session[:playernames]
	@player = 0
	erb :game
}

post('/player2'){
	session[:p1weapon] = params["weapon"]
	@names = session[:playernames]
	@score = session[:score]
	@player = 1
	erb :game
}

get('/endround'){
	@result = session.delete(:roundwinner)
	@names = session[:playernames]
	@score = session[:score]
	erb :endround
}


post('/playround'){
	result = determineWinner(session.delete(:p1weapon), params["weapon"])
	session[:score] = updateScore(session[:score],result)
	if session[:score]["Player 1"]<3 && session[:score]["Player 2"]<3
		session[:roundwinner] = result
		redirect('/endround')
	else
		redirect('/endgame')
	end
}

get('/endgame'){
	@score = session.delete(:score)
	@names = session.delete(:playernames)
	erb :end
}