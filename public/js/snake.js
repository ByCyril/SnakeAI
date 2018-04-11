//settings
var snakeX = 15;
var snakeY = 15;
var height = 30;
var width = 30;
var interval = 15; 
var increment = 1;

//game variables
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1 // up = 0, down = -1, left = 1, right = 2
var int;
var score = 0;
var distance = 100000;


// 
// Entry point of the game
// 

function run() {
	init();
	int = setInterval(gameLoop, interval);
}

function init() {
	createMap();
	createSnake();
	createFruit();
}

// 
// Generate the map of the snake
// 

function createMap() {

	document.write("<center><table>");

	for (var y = 0; y < height; y++) {

		document.write("<tr>");

		for (var x = 0; x < width; x++) {
			if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
				document.write("<td class='wall' id='"+ x + '-' + y + "'></td>");
			} else {
				document.write("<td class='blank' id='"+ x + '-' + y + "'></td>");
			}
		}

		document.write("</tr>");
	}

	document.write("</table></center>");
}

function createFruit() {
	var found = false;

	while(!found && (length < (width - 2) * (height - 2) + 1)) {
		var fruitX = rand(2, width - 2);
		var fruitY = rand(2, height - 2);

		if (getType(fruitX, fruitY) == "blank") {
			found = true;
		}

	} 

	set(fruitX, fruitY, "fruit");
	fX = fruitX;
	fY = fruitY;
}

window.addEventListener("keypress", function key() {

	//if key is W set direction up
	var key = event.keyCode;

	if (key == 13 || !running) {
		running = true;
		document.getElementById("label").innerHTML = ""
	} else if (key == 32) {
		running = false;
		document.getElementById("label").innerHTML = "Paused. Press the space bar to continue."
	}

});

function gameLoop() {

	if (running && !gameOver) {
		update()
	} else if (gameOver) {
		clearInterval(int);
	}
}

function update() {
	set(fX, fY, "fruit");

	// up = 0, down = -1, left = 1, right = 2

	navigation()
	isFoodCaught()

	set(tailX[length], tailY[length], "blank");

	updateTail();
	isHittingSelf();

	set(snakeX, snakeY, "snake");

	document.getElementById("score").innerHTML = "Score: " + score;

}

function isHittingSelf() {

	var className = getType(snakeX, snakeY);

	if (className == "snake") {
		gameOver = true;
		document.getElementById("label").innerHTML = "Game Over! Refresh the page to restart.";
	}
}

function isFoodCaught() {
	if (snakeX == fX && snakeY == fY) {
	
		distance = 100000;
		createFruit();
		length += increment;
		score += increment;
	}
}

function updateTail() {

	for (var i = length; i > 0; i--) {
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}

	tailX[0] = snakeX;
	tailY[0] = snakeY;
}

function navigation() {
	if (direction == 1) {
		snakeX--;
		direction = 1

		if (getDistance() == false) {
			snakeX++;
			snakeY--;
			direction = 0;

			if (getDistance() == false) {
				snakeY += 2;
				direction = -1
			}
		}
	} else if (direction == 2) {
		snakeX++;
		direction = 2

		if (getDistance() == false) {
			snakeX--;
			snakeY--;
			direction = 0;

			if (getDistance() == false) {
				snakeY += 2;
				direction = -1
			}
		}	
	} else if (direction == -1) {
		snakeY++;
		direction = -1

		if (getDistance() == false) {
			snakeY--;
			snakeX++;
			direction = 2;

			if (getDistance() == false) {
				snakeX -= 2;
				direction = 1
			}
		}
	} else if (direction == 0) {
		snakeY--;
		direction = 0

		if (getDistance() == false) {
			snakeY++;
			snakeX--;
			direction = 1

			if (getDistance() == false) {
				snakeX += 2;
				direction = 2
			}
		}
	}
}

function getDistance() {
	var xs = Math.pow(snakeX - fX, 2);
	var ys = Math.pow(snakeY - fY, 2);
	var d = Math.sqrt(xs + ys);

	if (d < distance) {
		distance = d
		return true;
	} else {
		return false;
	}


}

run();




















