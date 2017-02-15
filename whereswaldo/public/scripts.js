window.addEventListener("load", function (e){

	var trigger = document.getElementsByTagName("img")[0];
	trigger.addEventListener("click",findwaldo);

	function findwaldo(e){
		
		var currentwidth = e.target.offsetWidth;
		var currentheight = e.target.offsetHeight;
		var ratiowidth = currentwidth/1150;
		var ratioheight = currentheight/726;

		var clickX = e.offsetX/ratiowidth;
		var clickY = e.offsetY/ratioheight;
		querystring = "valueX=" + clickX + "&valueY=" + clickY + "&time=" + currenttimer.replace(/ /g, "");

		var ourRequest = new XMLHttpRequest();
		ourRequest.open('POST', '/check')
		ourRequest.onload = function() {
			var result = ourRequest.responseText
			showresult(result);
		}
		ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ourRequest.send(querystring);

		e.preventDefault();
	}

	function showresult(result) {
		var messagenode = document.getElementsByClassName("message")[0];
		var messagetimer = document.getElementsByClassName("messagetime")[0];
		if (result == "false") {
			messagenode.textContent = "Nope!";
			messagetimer.textContent = "You've used " + currenttimer;
		} else {
			messagenode.textContent = "You found Waldo!";
			messagetimer.textContent = "It took you " + currenttimer;
		}
		var modal = document.getElementsByClassName("modal_container")[0];
		modal.style.display = "block";
	}


	var closetrigger = document.getElementsByClassName("modalclose")[0];
	closetrigger.addEventListener("click",closemodal);

	function closemodal() {
		var modal = document.getElementsByClassName("modal_container")[0];
		modal.style.display = "none";
	}


	var myVar = setInterval(myTimer, 1000);
	var currenttimer = "";
	function myTimer() {
	    time = document.getElementsByClassName("timer")[0].textContent;
	    timearray = time.split(" ");
	    timearray[2] = String(parseInt(timearray[2]) + 1);
	    if (timearray[2] == "60") {
	    	timearray[0] = String(parseInt(timearray[0]) + 1); 
	    	timearray[2] = "0";
	    }
	    currenttimer = timearray.join(" ");
	    document.getElementsByClassName("timer")[0].textContent = currenttimer;
	}

});