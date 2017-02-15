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
	currentcolor = "";


	addClickListenerToClassEach("color",choosecolor);
	addClickListenerToClassEach("row",setcolor);
	function choosecolor(e){
		computedStyle = getComputedStyle(e.target, null)
		currentcolor = computedStyle.getPropertyValue('background-color')
	}
	function setcolor(e){
		e.target.style.backgroundColor = currentcolor;
	}


	addClickListenerToID("save_button",savePainting);

	function savePainting(e){
		var boxcolors = {}
		var boxes = document.getElementsByClassName("row")

		// var d = new Date();
		// var n = d.toJSON();
		// var querystring = "date=" + n;
		var d = new Date();
		datetime = d.getTime();
		datestring = d.toDateString() + " at " + d.toTimeString().substr(0,5);
		querystring = "date=" + datetime;

		for (i=0;i<boxes.length;i++){
			var rgbcolor = boxes[i].style.backgroundColor;
			color = colorhashinverted[rgbcolor]
			var box = boxes[i].getAttribute('id');
			boxcolors[box] = color;
			querystring = querystring + "&" + box + "=" + color;
		}

		// querystring = querystring.replace(/\s/g, "");

		makeQueryPOSTRequest('/test',querystring);

		// date = n.substr(5,5)
		// time = n.substr(11,5)
		// htmlstring = "<a href='#' class='saveddata'>" + date + " at " + time + "</a>"

		htmlstring = "<a href='#' class='saveddata'>"+datestring+"</a>";

		container = document.getElementsByClassName("saveddata_container")[0];
		container.insertAdjacentHTML('beforeend',htmlstring)

		e.preventDefault();
	}

	function makeQueryString(){

	}


	function createlist(data) {
		i=0;
		while (data[i] != undefined) {
			var d = new Date();
			d.setTime(data[i]["date"]);
			datestring = d.toDateString() + " at " + d.toTimeString().substr(0,5);
			htmlstring = "<a href='#' class='saveddata' id = " + i + ">" + datestring + "</a>"
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