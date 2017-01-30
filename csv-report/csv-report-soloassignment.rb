require 'csv'

require 'pry'

class AccountClass

	def initial_values
		@categoryData = {}
	end

	def addCategory(row)
		@categoryData[row["Category"]] = DataClass.new
		@categoryData[row["Category"]].initial_values
	end

	def addData(row)
		@categoryData[row["Category"]].addData(row)
	end

	def getCategoryData
		return @categoryData
	end

end

class DataClass
	def initial_values
		@transactions = []
	end

	def addData(row)
		@inflow = row["Inflow"].delete(",").delete("$").to_f
		@outflow = row["Outflow"].delete(",").delete("$").to_f
		@transactions << @inflow - @outflow
	end

	def calculateFinalValues
		@categoryTotal = @transactions.sum.round(2)
		@categoryAverage = (@transactions.sum/@transactions.length).round(2)
		@balance = @balance + @categoryTotal
	end
end

def set_initial_values(accountsHash,name)

	unless accountsHash.has_key?(name)
		accountsHash[name] = AccountClass.new
		accountsHash[name].initial_values
	end
	unless accountsHash[name].getCategoryData.has_key?(row["Category"])
		accountsHash[name].addCategory(row)
	end
	return accountsHash
end



inputNames = ARGV

accounts = {}

CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|
	accountName = row["Account"].chomp
	accounts = set_initial_values(accounts, accountName)
	accounts[accountName].addData(row)
end

accounts.each_value do |value|
	value.getCategoryData.each_value {|value| value.calculateFinalValues }
end










































# def csvToHash(accountName)
# 	hashAccount = Hash.new


# 	CSV.foreach("accounts.csv", {headers: true, return_headers: false}) do |row|

# 		row = cleanupRow(row)

# 		hashAccount(row["Account"]) = hashAccountData

# 	    if row["Account"] == accountName

# 			moneyarray = Array.new
# 			moneyarray << inflow.to_f - outflow.to_f

# 			if hashStandardizedData.has_key?(row["Category"])
# 				newarray = hashStandardizedData[row["Category"]].concat(moneyarray)
# 				hashStandardizedData[row["Category"]] = newarray
# 			else
# 				hashStandardizedData[row["Category"]] = moneyarray
# 			end


# 		end
# 	end

# 	return hashStandardizedData

# end



# k = 0
# while k < inputNames.length 

# 	hashStandardizedData2 = csvToHash(inputNames[k])

# 	categoryTotal = []
# 	category = []
# 	# category = {} # Or Hash.new
# 	# {
# 	# 	"Entertainment" => {"sum" => 200, "average" => 23},
# 	# 	"Utilities" => {"sum" => 220, "average" => 20}
# 	# }
# 	categoryAverage =[]

# 	# { and } can be replaced with do and end.
# 	# hashStandardizedData2.each {|key, value| category[key] = value.sum }

# 	hashStandardizedData2.each_value{|value|categoryTotal << value.sum}
# 	hashStandardizedData2.each_key{|key|category << key}
# 	hashStandardizedData2.each_value{|value|categoryAverage << value.sum/value.length}

# 	# TODO Integrate these operations into one loop above.
# 	categoryTotal.map! {|x| x.round(2)}
# 	categoryAverage.map! {|x| x.round(2)}

# 	balance = categoryTotal.sum

# 	categoryTotal.map! {|x| x.to_s}




# 	############### DISPLAY
# 	puts "============================================================\n"
# 	puts "Account: " + inputNames[k] + "... Balance: $" + balance.to_s + "\n"
# 	puts "============================================================\n"
# 	i = 0

# 	longestCategoryLength = category.max_by{|x| x.length}.length
# 	longestTotallength = categoryTotal.max_by{|x| x.length}.length

# 	puts "Category" + "\t\t|" + "Total Spent" + "\t|" + "Average Transaction"

# 	puts "------------------------|---------------|----------------"


# 	while i < category.length do
# 		while category[i].length < longestCategoryLength
# 			category[i] = category[i] + " "
# 		end
# 		while categoryTotal[i].length < longestTotallength
# 			categoryTotal[i] = categoryTotal[i] + " "
# 		end

# 		puts category[i].to_s + "\t\t|" + categoryTotal[i] + "\t|" + categoryAverage[i].to_s
# 		i += 1
# 	end
# 	k += 1
# end