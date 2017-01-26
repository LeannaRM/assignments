require 'csv'

require 'pry'


inputNames = ARGV


def csvToHash(accountName)
	hashStandardizedData = Hash.new


	CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
	    if row["Account"] == "Sonia\n"
    		row["Account"] = "Sonia"
    	end
    	if row["Category"] == "Groceries\n"
    		row["Category"] = "Groceries"
    	end

	    if row["Account"] == accountName
			

			outflow = row["Outflow"].delete(",").delete("$")
			inflow = row["Inflow"].delete(",").delete("$")


			moneyarray = Array.new
			moneyarray << inflow.to_f - outflow.to_f

			if hashStandardizedData.has_key?(row["Category"])
				newarray = hashStandardizedData[row["Category"]].concat(moneyarray)
				hashStandardizedData[row["Category"]] = newarray
			else
				hashStandardizedData[row["Category"]] = moneyarray
			end


		end
	end

	return hashStandardizedData

end

k = 0
while k < inputNames.length 

	hashStandardizedData2 = csvToHash(inputNames[k])

	balance = 0
	categorysumaverage = {}


	hashStandardizedData2.each do |key, value|
		categorysumaverage[key] = [value.sum.round(2), (value.sum/value.length).round(2)]
		balance +=value.sum
	end
	

	#categorysumaverage.map! {|x| x.to_s}




	############### DISPLAY
	puts "============================================================\n"
	puts "Account: " + inputNames[k] + "... Balance: $" + balance.round(2).to_s + "\n"
	puts "============================================================\n"
	
	i = 0
	longestCategoryLength = categorysumaverage.keys.max_by{|x| x.length}.length
	binding.pry			
	longestTotallength = categorysumaverage.values.transpose[0].max_by{|x| x.to_s.length}.to_s.length

	puts "Category" + "\t\t|" + "Total Spent" + "\t|" + "Average Transaction"

	puts "------------------------|---------------|----------------"


	while i < categorysumaverage.keys.length do
		while category[i].length < longestCategoryLength
			category[i] = category[i] + " "
		end
		while categoryTotal[i].length < longestTotallength
			categoryTotal[i] = categoryTotal[i] + " "
		end

		puts category[i].to_s + "\t\t|" + categoryTotal[i] + "\t|" + categoryAverage[i].to_s
		i += 1
	end
	k += 1
end



