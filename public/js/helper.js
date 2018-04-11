
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

function print(x) {
	console.log(x)
}

function createSnake() {
	set(snakeX, snakeY, "snake");
}