window.addEventListener("load", function (){

	colorhash = {
		"red": "rgb(204, 0, 0)",
		"blue": "rgb(0, 0, 204)",
		"yellow": "rgb(255, 236, 0)",
		"white": "rgb(255, 255, 255)"
	}
	colorhashinverted = {
		"rgb(204, 0, 0)": "red",
		"rgb(0, 0, 204)": "blue",
		"rgb(255, 236, 0)": "yellow"
	}

	var chooseColorTrigger = document.getElementsByClassName("color");
	for (i=0;i<chooseColorTrigger.length;i++){
		chooseColorTrigger[i].addEventListener("click",choosecolor);
	}
	currentcolor = "";
	function choosecolor(e){
		computedStyle = getComputedStyle(e.target, null)
		currentcolor = computedStyle.getPropertyValue('background-color')
	}


	var chooseBoxTrigger = document.getElementsByClassName("row");
	for (i=0;i<chooseBoxTrigger.length;i++){
		chooseBoxTrigger[i].addEventListener("click",setcolor);
	}

	function setcolor(e){
		e.target.style.backgroundColor = currentcolor;
	}


	var saveTrigger = document.getElementById("save_button");
	saveTrigger.addEventListener("click",savePainting);

	function savePainting(e){
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('POST', '/test', true);

		var boxcolors = {}
		var boxes = document.getElementsByClassName("row")

		var d = new Date();
		var n = d.toJSON();
		var querystring = "date=" + n;

		for (i=0;i<boxes.length;i++){
			var rgbcolor = boxes[i].style.backgroundColor;
			color = colorhashinverted[rgbcolor]
			var box = boxes[i].getAttribute('id');
			boxcolors[box] = color;
			querystring = querystring + "&" + box + "=" + color;
		}

		querystring = querystring.replace(/\s/g, "");
		ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ourRequest.send(querystring);

		date = n.substr(5,5)
		time = n.substr(11,5)
		htmlstring = "<a href='#' class='saveddata'>" + date + " at " + time + "</a>"

		container = document.getElementsByClassName("saveddata_container")[0];
		container.insertAdjacentHTML('beforeend',htmlstring)

		e.preventDefault();
	}


	function createlist(data) {
		i=0;
		while (data[i] != undefined) {
			datename = data[i]["date"]
			date = datename.substr(5,5)
			time = datename.substr(11,5)
			htmlstring = "<a href='#' class='saveddata' id = " + i + ">" + date + " at " + time + "</a>"
			container = document.getElementsByClassName("saveddata_container")[0];
			container.insertAdjacentHTML('beforeend',htmlstring)
		i += 1
		}
	}

	function createSavedDataList() {
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', '/saveddata')
		ourRequest.onload = function() {
			var ourdata = JSON.parse(ourRequest.responseText)
			createlist(ourdata);
			makeTriggers();
		}
		ourRequest.send()
	}
	
	createSavedDataList();

	function makeTriggers(){
		var savedPaintingTrigger = document.getElementsByClassName("saveddata");
		for (i=0;i<savedPaintingTrigger.length;i++){
			savedPaintingTrigger[i].addEventListener("click",showSavedPainting);
		}
	}

	function showSavedPainting(e){
		numberPainting = e.target.getAttribute('id');
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', '/saveddata')
		ourRequest.onload = function() {
			var ourdata = JSON.parse(ourRequest.responseText)
			showPainting(ourdata[numberPainting]);
		}
		ourRequest.send()
	}
	function showPainting(data) {
		boxes = document.getElementsByClassName("row")
		for (i=0;i<boxes.length;i++) {
			id = boxes[i].getAttribute('id')
			rgbcolor = colorhash[data[id]]
			boxes[i].style.backgroundColor = rgbcolor
		}
	}


});