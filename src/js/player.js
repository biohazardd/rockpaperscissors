import { MOVES, randomMove} from './moves';


export default class Player {
	constructor(name = '') {
		this.move = '';
		this.name = name;
	}

	template(disableBtns) {
		return `<h3>${this.name}</h3>
			<div class="game-icons ${this.name}">
				${MOVES.map((move) => {
					return `<li>
						<a href="#" class="${move}${disableBtns ? ' disabled': ''}"></a>
					</li>`;
				}).join('')}
			</div>
		`;
	}

	getMove() {
		return this.move;
	}

	setMove(move) {
		this.move = move;
	}
}

export class Human extends Player {
	constructor(name){
		super(name);
	}

	render() {
		const div = document.createElement('div');
		div.className = `player ${this.name}`;
		div.innerHTML = super.template();
		return div;
	}

	addListeners(callback) {
		const icons = document.getElementsByClassName(`game-icons ${this.name}`)[0];
		const aTags = icons.querySelectorAll('a');
		icons.addEventListener('click', (e) => {
			const target = e.target || e.srcElement;
			if (target.nodeName !== 'A') {
				return;
			}
			// If element is already selected
			for (let i = 0; i < aTags.length; i++) {
				let currNode = aTags[i];
				if (currNode.className.indexOf('selected') !== -1) {
					return;
				}
			}

			this.setMove(target.className);
			target.className += ` selected`;
			callback();
		});
	}
}

export class Computer extends Player {
	constructor(name){
		super(name);
	}

	render() {
		const div = document.createElement('div');
		div.className = `player ${this.name}`;
		div.innerHTML = super.template(true);
		return div;
	}

	simulateMove() {
		const move  = randomMove();
		const icons = document.getElementsByClassName(`game-icons ${this.name}`)[0];
		const element = icons.getElementsByClassName(`${move}`)[0];
		this.setMove(move);
		// remove disabled class
		element.className = element.className.replace(/\bdisabled\b/,'');
		element.className += ` selected`;
	}

}
