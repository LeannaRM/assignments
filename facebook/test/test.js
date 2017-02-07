window.addEventListener("load", function (){

function makeFocus(){
	document.getElementById("commentText").focus();
}

var trigger = document.getElementsByClassName("trigger")[0];
trigger.addEventListener("click",makeFocus);

});