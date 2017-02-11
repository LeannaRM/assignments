window.addEventListener("load", function (){

	var newgametrigger = document.getElementsByClassName("newgamebutton");
	newgametrigger[0].addEventListener("click",reload);

	function reload() {
		var questionbox = document.getElementsByClassName("newquestion--container")[0]
		questionbox.style.display = "none";
		document.getElementsByClassName("score--container")[0].style.display = "none";
		document.getElementsByClassName("message--container")[0].style.display = "none";
		document.getElementsByClassName("start--container")[0].style.display = "block";
		score = 0;
		message = "";
		questionnumber = 0;

	}

	var startgametrigger = document.getElementsByClassName("button--startgame");
	startgametrigger[0].addEventListener("click",showquestion);

	var questionnumber = 0;
	var questiontext = "";
	var answertext = "";
	var score = 0;
	var message = "";
	var usedquestions = [];

	function showquestion(e){
		// debugger;
		e.target.parentElement.parentElement.style.display = "none";
		var questionbox = document.getElementsByClassName("newquestion--container")[0]
		questionbox.style.display = "block";
		document.getElementsByClassName("score--container")[0].style.display = "block";

		// update question number
		questionnumber = questionnumber + 1;
		var questionnumstring = questionbox.children[0].textContent.split(" ");
		questionnumstring[2] = questionnumber.toString();
		questionbox.children[0].textContent = questionnumstring.join(" ");

		//get question
		// choose random question
		check = 0;
		while (check != -1){
			var randomnumber = Math.random()*(questions.length);
			var randomquestion = Math.round(randomnumber);
			check = usedquestions.indexOf(randomquestion);
		}
		questiontext = questions[randomquestion][0];
		answertext = questions[randomquestion][1].replace(".","");

		usedquestions.push(randomquestion);
		//display choosen question
		questionbox.children[1].textContent = questiontext;

		e.preventDefault()
	}

	var submitanswertrigger = document.getElementsByClassName("button--submitanswer");
	submitanswertrigger[0].addEventListener("click",checkanswer);

	function checkanswer(e){
		var inputanswer = e.target.previousElementSibling.value.toLowerCase();
		var minanswertext = answertext.toLowerCase();
		minanswertext = minanswertext.replace("the ","").replace("a ","").replace(" ","");
		var mininputanswer = inputanswer.replace("the ","").replace("a ","").replace(" ","");
		if (inputanswer == answertext.toLowerCase() || mininputanswer == minanswertext) {
			score = score + 1;
			message = "Correct!";
		}
		else {
			message = "Incorrect.\n The correct answer is: " + answertext;
		}

		//update message and score
		document.getElementsByClassName("messagetext")[0].textContent = message;

		var questionsright = document.getElementsByClassName("scoreboard")[0].textContent.split(" ");
		questionsright[2] = score.toString();
		document.getElementsByClassName("scoreboard")[0].textContent = questionsright.join(" ");

		var questionsasked = document.getElementsByClassName("scoreboard")[1].textContent.split(" ");
		questionsasked[2] = questionnumber.toString();
		document.getElementsByClassName("scoreboard")[1].textContent = questionsasked.join(" ");		

		// hide question and show message
		document.getElementsByClassName("newquestion--container")[0].style.display = "none";
		document.getElementsByClassName("message--container")[0].style.display = "block";		

		e.target.previousElementSibling.value = "";
		e.preventDefault()
	}

	var nextquestiontrigger = document.getElementsByClassName("button--nextquestion");
	nextquestiontrigger[0].addEventListener("click",showquestion);

	var questions = [
		["I'm tall when I'm young and I'm short when I'm old. What am I?", "A candle"],
		["What has hands but can not clap?", "A clock"],
		["What starts with the letter t, is filled with t and ends in t?", "A teapot"],
		["You walk into a room with a match, a karosene lamp, a candle, and a fireplace. Which do you light first?", "The match"],
		["What's full of holes but still holds water?", "A Sponge"],
		["My name is Ruger, I live on a farm. There are four other dogs on the farm with me. Their names are Snowy, Flash, Speedy and Brownie. What do you think the fifth dog's name is?", "Ruger"],
		["I am an odd number. Take away one letter and I become even. What number am I?", "Seven"],
		["What never asks questions but is often answered?","A doorbell"],
		["What 5-letter word becomes shorter when you add two letters to it?","Short"],
		["What can be seen once in a minute, twice in a moment and never in a thousand years", "the letter M"],
		["Which word is written incorrectly in the dictionary?","Incorrectly"],
		["The more you take out of it, the bigger it becomes. What is it?","A hole"]
	];

});






		// var txtFile = "./questions.txt"
		// var file = new File(txtFile);

		// file.open("r"); // open file with read access
		// var str = "";
		// while (!file.eof) {
		// 	// read each line of text
		// 	str += file.readln() + "\n";
		// }
		// file.close();
		// alert(str);


