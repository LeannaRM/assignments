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
		var d = new Date();
		querystring = makeQueryString(d);
		makeQueryPOSTRequest('/test',querystring);
		printNewSavedToScreen(d);
		makeTriggers();
		e.preventDefault();
	}

	function printNewSavedToScreen(date) {
		datestring = date.toDateString() + " at " + date.toTimeString().substr(0,5);
		htmlstring = "<a href='#' class='saveddata'>"+datestring+"</a>";
		container = document.getElementsByClassName("saveddata_container")[0];
		container.insertAdjacentHTML('beforeend',htmlstring);
	}

	function makeQueryString(date){
		datetime = date.getTime();
		var boxcolors = {}
		var boxes = document.getElementsByClassName("row")
		querystring = "date=" + datetime;
		for (i=0;i<boxes.length;i++){
			var rgbcolor = boxes[i].style.backgroundColor;
			color = colorhashinverted[rgbcolor]
			var box = boxes[i].getAttribute('id');
			boxcolors[box] = color;
			querystring = querystring + "&" + box + "=" + color;
		}
		return querystring
	}


	function createlist(data) {
		i=0;
		while (data[i] != undefined) {
			var d = new Date();
			d.setTime(data[i]["date"]);
			printNewSavedToScreen(d);
			i += 1
		}
	}

	function createSavedDataList() {
		makeJSONGETRequest('/saveddata', function(data) {
			createlist(data);
			makeTriggers();
		});
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