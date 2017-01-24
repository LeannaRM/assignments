require 'csv'

#CSV.foreach("./accounts.csv", {headers: true, return_headers: false}) do |row|
#    puts row.inspect
#end

#CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
#    puts row["Inflow"].inspect
#end


CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
    if row["Account"] == "Priya"
		puts row.inspect
	end
end



CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
    if row["Account"] == "Sonia" || row["Account"] == "Sonia\n"
		puts row.inspect
	end
end