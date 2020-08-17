'use strict'

function valueGameZone(a) {
	if (a%2 != 0 && a > 4) {
		alert('Ваше игровое поле ' +  a + ' на ' + a);
	}

} 

let gameZone = +prompt("Введите размер игрового поля! Число должно быть нечетным и больше 4!");
let score = 0;
let div = document.createElement('div');
let speed = 100;

valueGameZone(gameZone);// Запрос и вызов размера игрового поля

function createScore() {

	div.className = "score";
	zone.append(div);
}

createScore();

function createGameZone(parent,cell){

	let table = document.createElement('table');
	let y = 0;
	let x = 0;

	for (let i = 0; i < cell; i++){
		let tr = document.createElement('tr');
		x = 0;
		y++;
		for (let j = 0; j < cell; j++) {
			x++;
			let td = document.createElement('td');
			td.id = "x" + x + "y" + y;
			//td.innerHTML = td.id;//Наименование координат по ID
			tr.append(td);
		}
		table.append(tr);
	}
	parent.append(table);
}

createGameZone(zone,gameZone);// Создание игрового поля

let foodPos;

function createFood() {
	foodPos = {
		x: Math.floor(Math.random() * gameZone + 1),
		y: Math.floor(Math.random() * gameZone + 1)
	};
	let naw = ("x" + foodPos.x) + ("y" + foodPos.y);
	document.getElementById(naw).className = 'food';
	return foodPos;
}

createFood();

let snake = [];
snake[0] =  {
	x: Math.ceil(gameZone/2),
	y: Math.ceil(gameZone/2),
};

document.addEventListener("keydown",direction);

let dir;

function direction(event){
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir ="up";
	else if(event.keyCode == 39 && dir != "left")
		dir ="right";
	else if(event.keyCode == 40 && dir != "up")
		dir ="down";
}

function eatTail(head,arr){
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y) {
			clearInterval(startGame);
			alert("GAME OVER! YOU SCORE: " + score);
		}
	}
}

function createSnake() {

	if ( snake[0].x > gameZone || snake[0].y > gameZone || snake[0].x == 0 || snake[0].y == 0) {
		clearInterval(startGame);
		return alert("GAME OVER! YOU SCORE: " + score);
	}

	div.innerHTML = "SCORE: " + score;
	let nav;

	for (let i = 0; i < snake.length; i++) {
		nav = ("x" + snake[i].x) + ("y" + snake[i].y);
		if (!(document.getElementById(nav).classList.contains("food"))) {
			document.getElementById(nav).className = 'snake';
		}
	}

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == foodPos.x && snakeY == foodPos.y) {
		let nav2 = ('x'+ foodPos.x) + ('y' +foodPos.y); 
		document.getElementById(nav2).className = 'snake';
		createFood();
		score++;
		speed += 3;
	}else{
		snake.pop();
		setTimeout( () => document.getElementById(nav).classList.remove('snake'), speed*1.5);
	}

	if (dir == "left") snakeX -= 1;
	if (dir == "right") snakeX += 1;
	if (dir == "up") snakeY -= 1;
	if (dir == "down") snakeY += 1;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);
	snake.unshift(newHead);
}

let startGame = setInterval(createSnake,speed*2);

