//settings
var snakeX = 15;
var snakeY = 15;
var height = 30;
var width = 30;
var interval = 50; 
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

function createSnake() {
	set(snakeX, snakeY, "snake");
}

function get(x, y) {
	return document.getElementById(x + "-" + y);
}

function set(x, y, value) {

	if (x != null && y != null) {
		get(x, y).setAttribute("class", value);	
	}
	
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

function getType(x, y) {
	return get(x, y).getAttribute("class");
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
	} else if (key == 32) {
		running = false;
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
	updateTail();

	set(tailX[length], tailY[length], "blank");

	set(snakeX, snakeY, "snake");

	document.getElementById("score").innerHTML = "Score: " + score;

}

function isHittingSelf() {
	var className = get(snakeX, snakeY);

	if (className == "snake") {
		if (direction == 1 || direction == 2) {
			snakeY++;
			direction = -1;
			if (snakeX == tailX[i] && snakeY == tailY[i]) {
				snakeY--;
				direction = 0;
			}
		} else if (direction == -1 || direction == 0) {
			snakeX++;
			direction = 2;
			if (snakeX == tailX[i] && snakeY == tailY[i]) {
				snakeX -= 2;
				direction = 1;
			}
		} 
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

function print(x) {
	console.log(x)
}

run();




















