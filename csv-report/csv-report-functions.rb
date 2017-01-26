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
	



	############### DISPLAY
	puts "============================================================\n"
	puts "Account: " + inputNames[k] + "... Balance: $" + balance.round(2).to_s + "\n"
	puts "============================================================\n"
	
	i = 0
	longestCategoryLength = categorysumaverage.keys.max_by{|x| x.length}.length
		
	longestTotallength = categorysumaverage.values.transpose[0].max_by{|x| x.to_s.length}.to_s.length

	puts "Category" + "\t\t|" + "Total Spent" + "\t|" + "Average Transaction"

	puts "------------------------|---------------|----------------"

	categorysumaverage.each do |key, value|
		while key.length < longestCategoryLength
			key = key + " "
		end
		while value[0].to_s.length < longestTotallength
			value[0] = value[0].to_s + " "
		end
		puts key + "\t\t|" + value[0].to_s + "\t|" + value[1].to_s
	end
binding.pry

	k += 1
end



