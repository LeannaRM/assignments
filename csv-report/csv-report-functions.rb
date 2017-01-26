require 'csv'

require 'pry'

def take_off_next_line(row)
	if row["Account"] == "Sonia\n"
		row["Account"] = "Sonia"
	end
	if row["Category"] == "Groceries\n"
		row["Category"] = "Groceries"
	end
    return row
end


def cleanUpAndCalculate(row)
	outflow = row["Outflow"].delete(",").delete("$")
	inflow = row["Inflow"].delete(",").delete("$")

	moneyarray = Array.new
	moneyarray << inflow.to_f - outflow.to_f	
	return moneyarray
end

def fillHash(hashStandardizedData, row, moneyarray)
	if hashStandardizedData.has_key?(row["Category"])
		newarray = hashStandardizedData[row["Category"]].concat(moneyarray)
		hashStandardizedData[row["Category"]] = newarray
	else
		hashStandardizedData[row["Category"]] = moneyarray
	end
	return hashStandardizedData
end

inputNames = ARGV


def csvToHash(accountName)
	hashStandardizedData = Hash.new

	CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
    	row = take_off_next_line(row)
	    if row["Account"] == accountName
			moneyarray = cleanUpAndCalculate(row)
			hashStandardizedData = fillHash(hashStandardizedData, row, moneyarray)
		end
	end
	return hashStandardizedData
end

def calculateSumAverage(hashStandardizedData2)
	categorysumaverage = {}

	hashStandardizedData2.each do |key, value|
		categorysumaverage[key] = [value.sum.round(2), (value.sum/value.length).round(2)]
	end
	return categorysumaverage
end

def createSpacing(categorysumaverage)
	longestCategoryLength = categorysumaverage.keys.max_by{|x| x.length}.length	
	longestTotallength = categorysumaverage.values.transpose[0].max_by{|x| x.to_s.length}.to_s.length
	#hashWithSpacing = {}
	categorysumaverage.each do |key, value|
		while key.length < longestCategoryLength
			key = key + " "
			#binding.pry
		end
		while value[0].to_s.length < longestTotallength
			value[0] = value[0].to_s + " "
		end
	binding.pry
	end
	
	return categorysumaverage
end

k = 0

while k < inputNames.length 

	hashStandardizedData2 = csvToHash(inputNames[k])

	categorysumaverage = calculateSumAverage(hashStandardizedData2)

	balance = 0
	categorysumaverage.each_value{|value| balance+=value[0]}
	

	############### DISPLAY

	categorysumaverage = createSpacing(categorysumaverage)


	puts "============================================================\n"
	puts "Account: " + inputNames[k] + "... Balance: $" + balance.round(2).to_s + "\n"
	puts "============================================================\n"
	puts "Category" + "\t\t|" + "Total Spent" + "\t|" + "Average Transaction"
	puts "------------------------|---------------|----------------"
	categorysumaverage.each{|key, value| puts key + "\t\t|" + value[0].to_s + "\t|" + value[1].to_s}



	k += 1
end



