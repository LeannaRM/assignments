class PaintingsCSV

	def save(params)
		@boxcolorinfo = params
		File.open('painting.csv', 'a') do |file|
			@boxcolorinfo.each do |key, value|
				file << key + "," + value + "\n"
			end
		end
	end

	def returnjson
		i=0
		datahash = {}
		paintingnumber = 0
		CSV.foreach("painting.csv") do |row|
			if i%17 == 0
				paintingnumber = i/17
				datahash[paintingnumber] = {}
				datahash[paintingnumber][row[0]] = row[1]
				i += 1
			else
				datahash[paintingnumber][row[0]] = row[1]
				if datahash[paintingnumber][row[0]] == "undefined"
					datahash[paintingnumber][row[0]] = "white"
				end
				i += 1
			end
		end
		datajson = datahash.to_json
		return datajson
	end
end
