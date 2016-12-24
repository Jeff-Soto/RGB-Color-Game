var colors = colorsGenerator(6);
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var resetButton = document.querySelector(".reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

colorDisplay.textContent = pickedColor;

hardMode();
//bool for checking which mode is currently chosen.
var isEasy = false;

easy.addEventListener("click", function(){
	isEasy = true;
	easyMode();
	hard.classList.remove("selectedBtn");
	easy.classList.add("selectedBtn");
	resetButton.textContent = "NEW COLORS";
});
hard.addEventListener("click", function(){
	isEasy = false;
	hardMode();
	hard.classList.add("selectedBtn");
	easy.classList.remove("selectedBtn");
	resetButton.textContent = "NEW COLORS";
});

resetButton.addEventListener("click", function(){
	if(isEasy){
		easyMode();
		this.textContent = "NEW COLORS";
	}else{
		hardMode();
		this.textContent = "NEW COLORS";
	}
});
function hardMode(){
	for (var i = 3; i < squares.length; i++){
		squares[i].classList.remove("hide");
	}
	reset(6);
}

function easyMode(){
	for (var i = 3; i < squares.length; i++){
		squares[i].classList.add("hide");
	}
	reset(3);
}


//main game loop
function gameLoop(){
	for (var i = 0; i < squares.length; i++){
	//Add color to each square
	squares[i].style.background = colors[i];

	//Add Click Event
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.background;

		if (clickedColor === pickedColor){
			message.textContent = "Correct!";
			for (var i = 0; i < squares.length; i++){
				squares[i].style.background = clickedColor;
				console.log(squares[i].value);
			}
			resetButton.textContent = "PLAY AGAIN?"
			h1.style.background = clickedColor;

		}else{
			message.textContent = "Try Again";
			this.style.background = "black";
		}
	});
	}	
}

// necessary functions for game
function colorsGenerator(num){
	//create arr
	var arr = [];
	//add num ran colors to it
	for(var i = 0; i < num; i++){
		arr.push(randomColorMaker()); 
	}
	return arr;//return it
}
function randomColorMaker(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];

}
function reset(num){
	colors = colorsGenerator(num);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.background = "steelblue";
	message.textContent = "";
	gameLoop();
}
