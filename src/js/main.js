require('../css/main.scss');

import logic from './logic';
import { Computer, Human } from './player';

function registerListeners() {
	const menus = document.querySelectorAll('.game-play .menu')[0];

	menus.addEventListener('click', (e) => {
		const target = e.target || e.srcElement;
		switch(target.nodeName) {
			case 'BUTTON':
				if (target.className === 'player-computer') {
					return startGame(target.parentNode);
				}
				return simulateGame(target.parentNode);
			default:
				return;
		}
	});

	//restart the game
	const restartBtn = document.querySelectorAll('#result .restart')[0];
	restartBtn.addEventListener('click', () => {
		window.location.reload();
	});
}

registerListeners();

const gameMenu = document.getElementsByClassName('menu')[0];
const gameStatus = document.getElementsByClassName('status')[0];

function addClass(ele, className) {
	ele.className += ` ${className}`;
}

function startGame() {
	const human = new Human('You');
	const computer = new Computer('computer');
	addClass(gameMenu, 'hide');
	gameStatus.appendChild(human.render());
	gameStatus.appendChild(computer.render());
	addClass(gameStatus, 'show');

	// add interactions to human player
	human.addListeners(computerMove);

	// Simulate Computer move
	function computerMove() {
		setTimeout(() => {
			computer.simulateMove()
			const resultText = logic(human.name, human.getMove(), computer.getMove());
			const resultContainer = document.getElementById('result');
			resultContainer.firstChild.textContent = resultText
			addClass(resultContainer, 'show');
		}, 300);
	}
}

function simulateGame() {
	const computer1 = new Computer('computer1');
	const computer2 = new Computer('computer2');
	addClass(gameMenu, 'hide');
	gameStatus.appendChild(computer1.render());
	gameStatus.appendChild(computer2.render());
	addClass(gameStatus, 'show');
	// Simulate both moves
	computer1.simulateMove();
	// Introduce artificial delays
	setTimeout(() => {
		computer2.simulateMove();
		const resultText = logic(computer1.name, computer1.getMove(), computer2.getMove());
		const resultContainer = document.getElementById('result');
		resultContainer.firstChild.textContent = resultText
		addClass(resultContainer, 'show');
	}, 300);
}

