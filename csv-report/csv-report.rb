require 'csv'

require 'pry'

hashPriya = Hash.new

#def csvToHash(accountName)

	CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
	    if row["Account"] == "Priya"
			#puts row.inspect
			
			outflow = row["Outflow"].delete ","
			inflow = row["Inflow"].delete ","
			outflow = outflow.delete "$"
			inflow = inflow.delete "$"

			moneyarray = Array.new
			moneyarray << inflow.to_f - outflow.to_f

			if hashPriya.has_key?(row["Category"]) == true
				newarray = hashPriya[row["Category"]].concat(moneyarray)
				hashPriya[row["Category"]] = newarray
			else
				hashPriya[row["Category"]] = moneyarray
			end


		end
	end

#	return dataAsHash
#end


#hashPriya[0]
#hashPriya["Allowance"]
categoryTotal = []
category = []
categoryAverage =[]
hashPriya.each_value{|value|categoryTotal << value.sum}
hashPriya.each_key{|key|category << key}
hashPriya.each_value{|value|categoryAverage << value.sum/value.length}

categoryTotal.compact!
#binding.pry
categoryTotalrounded = []

#categoryTotal.each {|x| categoryTotalrounded << x.round(2)}

categoryTotal.map! {|x| x.round(2)}
categoryAverage.map! {|x| x.round(2)}

balance = categoryTotal.sum

categoryTotal.map! {|x| x.to_s}

#print balance 
#puts "\n"
#print category 
#puts "\n"
#print categoryTotal 
#puts  "\n"
#print categoryAverage 
#puts "\n"



#binding.pry


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



############### DISPLAY
puts "============================================================\n"
puts "Account: " + "Priya" + "... Balance: $" + balance.to_s + "\n"
puts "============================================================\n"
i = 0

longestCategoryLength = category.max_by{|x| x.length}.length
longestTotallength = categoryTotal.max_by{|x| x.length}.length

puts "Category" + "\t\t|" + "Total Spent" + "\t|" + "Average Transaction"

puts "------------------------|---------------|----------------"


while i < category.length do
	while category[i].length < longestCategoryLength
		category[i] = category[i] + " "
	end
	while categoryTotal[i].length < longestTotallength
		categoryTotal[i] = categoryTotal[i] + " "
	end

	puts category[i].to_s + "\t\t|" + categoryTotal[i] + "\t|" + categoryAverage[i].to_s
	i += 1
end











