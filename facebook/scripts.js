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
	var replyArray = document.getElementsByClassName("action--reply");

	for (i=0; i < likeArray.length; i++) {
		if (i==0){	
			likeArray[i].addEventListener('click',likeToUnlikeFirst);
			unlikeArray[i].addEventListener('click',unlikeToLikeFirst);
		}
		likeArray[i].addEventListener('click',likeToUnlike);
		unlikeArray[i].addEventListener('click',unlikeToLike);
		if (replyArray[i]){
			replyArray[i].addEventListener("click",openReplies);
		}
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

	function openReplies(){
		replycomments = this.parentElement.parentElement.getElementsByClassName("replies")[0]
		if (replycomments.style.display == "none"){
			replycomments.style.display = "block";
		} else {
			replycomments.style.display = "none"
		}
	}

	function nameModal(){
		document.getElementsByClassName("modal")[0].style.display = "block";
		nametext = this.innerText;
		document.getElementsByClassName("modal__title")[0].innerText = nametext;
	}

	var names = document.getElementsByClassName("name");
	for (i=0;i<names.length;i++){
		names[i].addEventListener("click",nameModal);
	}


	function closeModal(){
		document.getElementsByClassName("modal")[0].style.display = "none";
	}

	var exbox = document.getElementsByClassName("modal__close")[0];
	exbox.addEventListener("click",closeModal);



















	// document.getElementsByClassName("action--comment")[0].style.display = "none"

// 	document.getElementById("commentText").style.background = "yellow";



// 	// function blah(){
// 	// 	// var textbox = document.getElementsByClassName("commentText");
// 	// 	// document.getElementById("commentText").style.background-color = red;
// 	// 	document.getElementById("commentText").focus();
// 	// 	// textbox.focus();
// 	// 	// textbox.select();
// 	// 	// debugger;
// 	// }

// 	// var comment = document.getElementsByClassName("action--comment")[0];
// 	// comment.addEventListener('click',blah);
// debugger;
// function makeFocus(){
// 	document.getElementById("newID").style.background = "yellow";
	
// 	document.getElementById("newID").focus();
// }
// makeFocus();
// // var trigger = document.getElementsByClassName("action--comment")[0];
// // trigger.addEventListener("click",makeFocus);

});