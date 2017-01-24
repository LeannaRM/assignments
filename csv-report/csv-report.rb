require 'csv'

#CSV.foreach("./accounts.csv", {headers: true, return_headers: false}) do |row|
#    puts row.inspect
#end

#CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
#    puts row["Inflow"].inspect
#end
hashPriya = Hash.new

CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
    if row["Account"] == "Priya"
		#puts row.inspect
		
		outflow = row["Outflow"].delete ","
		inflow = row["Inflow"].delete ","
		outflow = outflow.delete "$"
		inflow = inflow.delete "$"

		moneyarray = Array.new
		moneyarray << inflow.to_f - outflow.to_f
		#print row["Category"]
		#print hashPriya.has_key?(row["Category"])

		if hashPriya.has_key?(row["Category"]) == true
			newarray = hashPriya[row["Category"]].concat(moneyarray)
			hashPriya[row["Category"]] = newarray

		else

			hashPriya[row["Category"]] = moneyarray
		end
	end
end

print hashPriya

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

def collectCategory(myCategory)
	if row["Category"] == myCategory

	end
end