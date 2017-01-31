var functions = require('./functions');




var i = 0
while (i<3){

	var prompt = require('prompt');
	prompt.start();

	prompt.get(['P1', 'P2'], function (err, result) {
		p1_weapon = result.P1.toLowerCase()
		p2_weapon = result.P2.toLowerCase()

		result = functions.determineWinnerFunction(p1_weapon,p2_weapon)
		console.log(result)
	});
	
	// prompt.stop();


	i+=1
	// console.log(i)
}