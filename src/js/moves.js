export const MOVES = [ 'rock', 'paper', 'scissor' ];

export function randomMove() {
	const max = MOVES.length - 1;
	return MOVES[Math.floor(Math.random() * (max + 1))];
}
