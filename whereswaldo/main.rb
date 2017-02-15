require 'sinatra'
require 'pry'
require 'csv'
require_relative "./functions.rb"
enable :sessions

coordinates = CoordinatesCSV.new

get("/index") {
	erb :index
}

get("/returnresult") {
	session[:result]
}


post("/check"){
	session[:result]= coordinates.checkcoordinates(params)
	redirect('/returnresult')
}