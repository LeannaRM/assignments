window.addEventListener("load", function (){

	var chooseColorTrigger = document.getElementsByClassName("color");
	for (i=0;i<chooseColorTrigger.length;i++){
		chooseColorTrigger[i].addEventListener("click",choosecolor);
	}
	currentcolor = "";
	function choosecolor(e){
		currentcolor = e.target.getAttribute('id')
	}

	var chooseBoxTrigger = document.getElementsByClassName("row");
	for (i=0;i<chooseBoxTrigger.length;i++){
		chooseBoxTrigger[i].addEventListener("click",setcolor);
	}

	function setcolor(e){
		e.target.style.backgroundColor = currentcolor;
	}


});