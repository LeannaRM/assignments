require 'sinatra'
require_relative "./classes/functions.rb"
require_relative "./classes/edit.rb"
require_relative "./classes/data.rb"
require_relative "./classes/accounts.rb"
require 'pry'
require 'csv'

enable :sessions

get("/index") {
	@message = session[:message]
	erb :index
}

get("/data") {
	checkUsername(session[:currentuser])
	@data = csvAccountDataParsing
	@name = params["name"]
	erb :data
}

post("/printcsv") {
	removeRowFunction(params)
	redirect('/removecsvsuccess')
}

get("/printcsv") {
	checkUsername(session[:currentuser])
	@rows = printCSV(params)
	erb :printcsv
}

post("/addcsv") {
	addRowFunction(params)
	redirect('/addcsvsuccess')
}

get("/addcsv") {
	checkUsername(session[:currentuser])
	erb :addcsv
}

get("/addcsvsuccess") {
	checkUsername(session[:currentuser])
	erb :addcsvsuccess
}

get("/removecsvsuccess") {
	checkUsername(session[:currentuser])
	erb :removecsvsuccess
}

get("/editrow") {
	@rows = printCSV(params)
	@row_to_edit = session[:row_to_edit]
	erb :editrow
}

post("/editrow") {
	editRowFunction(params, session[:row_to_edit])
	session.delete(:row_to_edit)
	redirect :printcsv
}

post('/editcsv') {
	session[:row_to_edit] = params['row_to_edit'].to_i - 1
	redirect('/editrow')
}

get("/"){
	@user = session[:currentuser]
	erb :login
}

get('/loginerror'){
	@name = session[:notcurrentuser]
	erb :loginerror
}

post("/login"){
	name = params["username"]
	password = params["password"]

	allusers = {}
	CSV.foreach("./views/users.csv", {headers:true, return_headers: false}) do |row|
		key = row["username"]
		value = row["password"]
		allusers[key]=value
	end

	temppassword = allusers[@name]
	if password == temppassword
		session[:currentuser] = @name
		session[:message] = "Welcome #{name.capitalize}!"
		redirect('/index')
	else
		session[:notcurrentuser] = @name
		redirect('/loginerror')
	end
	
}

post('/logout'){
	session.delete(:currentuser)
	redirect('/')
}

def checkUsername(user)
	unless user
		redirect('/loginerror')
	end
end

# OLD CODE
# get("/both") {
# 	@data = csvAccountDataParsing
# 	@names = ['Sonia', 'Priya']
# 	erb :data
# }