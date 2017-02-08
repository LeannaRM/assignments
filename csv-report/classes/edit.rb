require 'csv'
require 'pry'

#load accounts.csv file into program
class AccountByTransaction
	def setup(name)
		@name = name
		@arrayOfTransactions = []
		self.loadArray
	end

	def loadArray
		CSV.foreach('accounts.csv', {headers:true}) do |row|
			row["Account"] = row["Account"].chomp
			row["Category"] = row["Category"].chomp
			row["Payee"] = row["Payee"].chomp
			row["Inflow"] = row["Inflow"].delete(",")
			row["Outflow"] = row["Outflow"].delete(",")
			if row["Payee"] == @name
				@arrayOfTransactions << row.to_s
			end
		end
	end

	def returnTransactions
		return @arrayOfTransactions
	end

	#remove a question from the questions.txt file
	def removeRow(numString)
		numToRemove = numString.to_i - 1
		@arrayOfTransactions.delete_at(numToRemove)
		return @arrayOfTransactions
	end

#add a row to the accounts.csv file
	def addRow
		new_row = @vars.values
		csvrow = new_row.to_csv
		@arrayOfRows.push(csvrow)
	end




#update accounts.csv after adding/removing a row
	def updateCSVFile
		File.open('accounts.csv', 'w') do |file|
			file << "Account,Date,Payee,Category,Outflow,Inflow\n"
			@arrayOfRows.each do |line|
				file << line
			end
		end
	end



end

def printCSV(params)
	newRow = EditRow.new
	newRow.test(params)
	newRow.loadArray
	return newRow.returnArray
end

def addRowFunction(params)
	newRow = EditRow.new
	newRow.test(params)
	newRow.loadArray
	newRow.addRow
	newRow.updateCSVFile
end

def removeRowFunction(params)
	newRow = EditRow.new
	newRow.test(params)
	newRow.loadArray
	newRow.removeRow
	newRow.updateCSVFile
end

def rowToArray(arrayOfRows,rowToGet)
	row_to_edit = arrayOfRows.values_at(rowToGet).shift
	newArray = row_to_edit.delete("\n").split(",")
	return newArray
end

def editRowFunction(params,rowToGet)
	columnToGet = params["x"].to_i
	newText = params["info_to_edit"]

	arrayOfRows = printCSV({})
	newArray = rowToArray(arrayOfRows,rowToGet)

	newArray[columnToGet] = newText
	newcsvrow = newArray.to_csv
	arrayOfRows[rowToGet] = newcsvrow
	updateCSVFile(arrayOfRows)
end

def updateCSVFile(arrayOfRows)
	File.open('accounts.csv', 'w') do |file|
		file << "Account,Date,Payee,Category,Outflow,Inflow\n"
		arrayOfRows.each do |line|
			file << line
		end
	end
end