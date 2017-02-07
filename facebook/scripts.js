window.addEventListener("load", function (){

	function likeToUnlike (){
		var unlikeText = this.nextElementSibling;
		this.style.display = "none";
		unlikeText.style.display = "inline-block";

		var numLikesString = this.parentElement.getElementsByTagName("span")[0].innerText;
		var likesArray = numLikesString.split(" ");
		likesArray[0] = parseInt(likesArray[0]) + 1;
		newText = likesArray.join(" ");
		this.parentElement.getElementsByTagName("span")[0].innerText = newText
	}

	function unlikeToLike (){
		var likeText = this.previousElementSibling;
		likeText.style.display = "inline-block";
		this.style.display = "none";

		var numLikesString = this.parentElement.getElementsByTagName("span")[0].innerText;
		var likesArray = numLikesString.split(" ");
		likesArray[0] = parseInt(likesArray[0]) - 1;
		newText = likesArray.join(" ");
		this.parentElement.getElementsByTagName("span")[0].innerText = newText
	}

	var likeArray = document.getElementsByClassName("action--like");
	var unlikeArray = document.getElementsByClassName("action--unlike");

	for (i=1; i < likeArray.length; i++) {
		likeArray[i].addEventListener('click',likeToUnlike);
		unlikeArray[i].addEventListener('click',unlikeToLike);
	}


	function likeToUnlikeFirst (){
		var unlikeText = this.nextElementSibling;
		this.style.display = "none";
		unlikeText.style.display = "inline-block";

		var numLikesString = document.getElementsByClassName("post__info")[0].children[0].innerText;
		var likesArray = numLikesString.split(" ");
		likesArray[0] = parseInt(likesArray[0]) + 1;
		var newText = likesArray.join(" ");
		document.getElementsByClassName("post__info")[0].children[0].innerText = newText
	}

	function unlikeToLikeFirst (){
		var likeText = this.previousElementSibling;
		likeText.style.display = "inline-block";
		this.style.display = "none";

		var numLikesString = document.getElementsByClassName("post__info")[0].children[0].innerText;
		var likesArray = numLikesString.split(" ");
		likesArray[0] = parseInt(likesArray[0]) - 1;
		var newText = likesArray.join(" ");
		document.getElementsByClassName("post__info")[0].children[0].innerText = newText
	}


	likeArray[0].addEventListener('click',likeToUnlikeFirst);
	unlikeArray[0].addEventListener('click',unlikeToLikeFirst);


	// function blah(){
	// 	// var textbox = document.getElementsByClassName("commentText");
	// 	// document.getElementById("commentText").style.background-color = red;
	// 	document.getElementById("commentText").focus();
	// 	// textbox.focus();
	// 	// textbox.select();
	// 	// debugger;
	// }

	// var comment = document.getElementsByClassName("action--comment")[0];
	// comment.addEventListener('click',blah);

function makeFocus(){
	document.getElementById("newIDblah").style.background = "yellow";
	
	document.getElementById("newIDblah").focus();
}
makeFocus();
// var trigger = document.getElementsByClassName("action--comment")[0];
// trigger.addEventListener("click",makeFocus);

});