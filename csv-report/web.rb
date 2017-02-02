require 'sinatra'
require_relative "./functions.rb"
require 'pry'
require 'csv'

get("/") {
	erb :index
}

get("/data") {
	@data = csvAccountDataParsing
	@vars = params
	@name = @vars["name"]
	erb :data
}



get("/sonia") {
	@data = csvAccountDataParsing
	@names = ['Sonia']
	erb :data
}

get("/priya") {
	@data = csvAccountDataParsing
	@names = ['Priya']
	erb :data
}

get("/both") {
	@data = csvAccountDataParsing
	@names = ['Sonia', 'Priya']
	erb :data
}