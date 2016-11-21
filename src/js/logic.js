// Decides the winner based on the moves
module.exports = function logic(playername, move1 = 'rock', move2 = 'paper') {

	if(move1 === move2) {
		return 'Draw';
	}

	switch(move1) {
		case 'rock':
			return isExpected(playername, move2, 'scissor');
		case 'paper':
			return isExpected(playername, move2, 'rock');
		case 'scissor':
			return isExpected(playername, move2, 'paper');
	}
}

function isExpected(playername, move2, value) {
	if (move2 === value) {
		return `${playername} Won`;
	} else {
		return `${playername} Lost`;
	}
}
