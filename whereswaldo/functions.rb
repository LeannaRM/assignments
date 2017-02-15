class CoordinatesCSV

	def checkcoordinates(params)
		correct = []
		CSV.foreach('waldocoordinates.csv') do |row|
			correct = row
		end
		xcoord = correct[0].to_f
		ycoord = correct[1].to_f
		if params["valueX"].to_f.between?(xcoord - (xcoord*0.02), xcoord + (xcoord*0.02))
			if params["valueY"].to_f.between?(ycoord - (ycoord*0.1), ycoord + (ycoord*0.1))
				guess = "true"
				File.open('savedtimes.csv', 'a') do |file|
					file << params["time"] + "\n"
				end

			else
				guess = "false"
			end
		else
			guess = "false"
		end
		return guess
	end


	def save(params)
		@boxcolorinfo = params
		
	end
end