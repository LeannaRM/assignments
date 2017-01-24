require 'csv'

#CSV.foreach("./accounts.csv", {headers: true, return_headers: false}) do |row|
#    puts row.inspect
#end

#CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
#    puts row["Inflow"].inspect
#end
categoryHashPriya = Hash.new

CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
    if row["Account"] == "Priya"
		#puts row.inspect
		
		#money = row[Inflow] - row[Outflow]
		#money = "$5000.00" - "$0.00"
		outflow = row["Outflow"].delete ","
		inflow = row["Inflow"].delete ","
		outflow = outflow.delete "$"
		inflow = inflow.delete "$"

		puts "\n"
		puts outflow
		puts inflow

		print money = inflow.to_f - outflow.to_f
		#print \n


		#categoryHashPriya[row["Category"]] = money

		#puts row["Outflow"].to_I.sum
	end
end



CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
    if row["Account"] == "Sonia\n"
    	row["Account"] = "Sonia"
    	#puts row.inspect
    elsif row["Account"] == "Sonia"
		#puts row.inspect
	end
	#puts row["Outflow"].delete "$"
	#puts row["Inflow"].delete "$"
end