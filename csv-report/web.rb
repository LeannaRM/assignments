require 'sinatra'
require_relative "./classes/functions.rb"
require_relative "./classes/edit.rb"
require_relative "./classes/data.rb"
require_relative "./classes/accounts.rb"
require 'pry'
require 'csv'

enable :sessions

get("/"){
	@user = session[:currentuser]
	erb :login
}

post("/login"){
	name = params["username"]
	password = params["password"]

	#send to main screen if login successful and to error if not
	checkLoginSuccess(name,password)	
}

get('/loginerror'){
	@name = session[:notcurrentuser]
	erb :loginerror
}

get("/index") {
	@name = session[:currentuser].capitalize
	checkUsername(@name)
	erb :index
}

get("/summary") { #was /data
	checkUsername(session[:currentuser])
	@data = csvAccountDataParsing
	@name = params["name"]
	erb :summary
}

get("/details") { #was /printcsv
	checkUsername(session[:currentuser])
	@transactions = userAccount.returnTransactions
	erb :details 
}

post("/removeTransaction") {
	userAccount.removeTransaction(param[row_to_remove])
	redirect('/removecsvsuccess')
}

get("/removecsvsuccess") {
	checkUsername(session[:currentuser])
	erb :removecsvsuccess
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




post('/logout'){
	session.delete(:currentuser)
	redirect('/')
}

def checkLoginSuccess(name,password)
	#read in csv with all user, password pairs
	allusers = {}
	CSV.foreach("./views/users.csv", {headers:true, return_headers: false}) do |row|
		key = row["username"]
		value = row["password"]
		allusers[key]=value
	end

	#check for a match
	temppassword = allusers[name]
	if password == temppassword
		session[:currentuser] = name
		userAccount = AccountByTransaction.new
		userAccount.setup(name)
		redirect('/index')
	else
		session[:notcurrentuser] = name
		redirect('/loginerror')
	end
end

#if user exists then a user is logged in
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